import { apiFetch } from "@/lib/api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const cropSchema = z.object({
  N: z.coerce.number().min(0, "Must be positive"),
  P: z.coerce.number().min(0, "Must be positive"),
  K: z.coerce.number().min(0, "Must be positive"),
  temperature: z.coerce.number(),
  humidity: z.coerce.number().min(0).max(100),
  ph: z.coerce.number().min(0).max(14),
  rainfall: z.coerce.number().min(0),
})

type CropFormValues = z.infer<typeof cropSchema>

export default function CropRecommendation() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropFormValues>({
    resolver: zodResolver(cropSchema),
    defaultValues: {
      N: 90, P: 42, K: 43, temperature: 20.8, humidity: 82.0, ph: 6.5, rainfall: 202.9
    }
  })

  async function onSubmit(data: CropFormValues) {
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const token = localStorage.getItem("token")
      const response = await apiFetch("/api/ml/predict-crop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Prediction failed")
      }

      const resData = await response.json()
      setResults(resData.top_crops)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crop Recommendation AI</h1>
        <p className="text-muted-foreground">
          Enter your soil metrics and climate data to get an AI-driven crop recommendation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Soil & Climate Data</CardTitle>
            <CardDescription>Provide accurate readings for the best results.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nitrogen (N)</label>
                  <Input type="number" step="any" {...register("N")} />
                  {errors.N && <p className="text-xs text-red-500">{errors.N.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phosphorous (P)</label>
                  <Input type="number" step="any" {...register("P")} />
                  {errors.P && <p className="text-xs text-red-500">{errors.P.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Potassium (K)</label>
                  <Input type="number" step="any" {...register("K")} />
                  {errors.K && <p className="text-xs text-red-500">{errors.K.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature (°C)</label>
                  <Input type="number" step="any" {...register("temperature")} />
                  {errors.temperature && <p className="text-xs text-red-500">{errors.temperature.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Humidity (%)</label>
                  <Input type="number" step="any" {...register("humidity")} />
                  {errors.humidity && <p className="text-xs text-red-500">{errors.humidity.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Soil pH</label>
                  <Input type="number" step="any" {...register("ph")} />
                  {errors.ph && <p className="text-xs text-red-500">{errors.ph.message}</p>}
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Rainfall (mm)</label>
                  <Input type="number" step="any" {...register("rainfall")} />
                  {errors.rainfall && <p className="text-xs text-red-500">{errors.rainfall.message}</p>}
                </div>
              </div>
              
              {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">{error}</div>}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Recommendation
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>AI Prediction Result</CardTitle>
              <CardDescription>Top 3 recommended crops will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-[250px]">
              {results ? (
                <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                  {results.map((item, index) => (
                    <div key={item.crop} className={`flex items-center p-4 rounded-xl border ${index === 0 ? 'bg-green-50 border-green-200 dark:bg-green-950/30' : 'bg-neutral-50 dark:bg-neutral-900'} shadow-sm`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${index === 0 ? 'bg-green-200 text-green-700' : 'bg-neutral-200 text-neutral-600'}`}>
                        <Sprout className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold capitalize ${index === 0 ? 'text-green-800 dark:text-green-400' : ''}`}>
                          {item.crop}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {index === 0 ? 'Highly Recommended' : 'Alternative Option'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{item.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Match</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                  <Sprout className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Awaiting data input...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
