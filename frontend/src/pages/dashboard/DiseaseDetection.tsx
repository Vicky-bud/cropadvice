import { apiFetch } from "@/lib/api"
import { useState, useRef } from "react"
import { Loader2, UploadCloud, ShieldAlert, CheckCircle2, Leaf, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DiseaseResult {
  crop: string
  disease: string
  confidence: number
  treatments: {
    organic: string[]
    chemical: string[]
    fertilizer: string[]
  }
}

export default function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DiseaseResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      
      setResult(null)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile)
        setPreview(URL.createObjectURL(droppedFile))
        setResult(null)
        setError(null)
      } else {
        setError("Please upload an image file.")
      }
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsLoading(true)
    setError(null)
    setResult(null)
    
    const formData = new FormData()
    formData.append("file", file)

    try {
      const token = localStorage.getItem("token")
      const response = await apiFetch("/api/ml/predict-disease", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Analysis failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const clearSelection = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ShieldAlert className="mr-3 h-8 w-8 text-green-600" />
          Disease Detection Pipeline
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload a clear photo of a plant leaf. Our two-stage ML pipeline will detect the crop, diagnose the disease, and use AI to prescribe organic, chemical, and fertilizer treatments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Leaf Image Upload</CardTitle>
            <CardDescription>Drag and drop or click to select an image</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {!preview ? (
              <div 
                className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors flex-1 min-h-[300px]"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <UploadCloud className="h-16 w-16 text-neutral-400 mb-4" />
                <h3 className="text-lg font-semibold mb-1">Click to upload</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  SVG, PNG, JPG or GIF (max. 5MB)
                </p>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-900 border">
                  <img 
                    src={preview} 
                    alt="Leaf preview" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex space-x-3 mt-auto">
                  <Button variant="outline" className="flex-1" onClick={clearSelection} disabled={isLoading}>
                    Clear
                  </Button>
                  <Button className="flex-1" onClick={handleAnalyze} disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running Pipeline...</>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            {error && <div className="mt-4 p-3 text-sm text-red-500 bg-red-100 rounded-md">{error}</div>}
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Pipeline Results</CardTitle>
            <CardDescription>Multi-stage detection and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {result ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-500 overflow-y-auto max-h-[600px] pr-2">
                <div className={`p-6 rounded-2xl border flex flex-col items-center text-center ${result.disease.toLowerCase().includes('healthy') ? 'bg-green-50 border-green-200 dark:bg-green-950/30' : 'bg-red-50 border-red-200 dark:bg-red-950/30'}`}>
                  {result.disease.toLowerCase().includes('healthy') ? (
                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  ) : (
                    <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                  )}
                  
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {result.crop}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${result.disease.toLowerCase().includes('healthy') ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                    {result.disease}
                  </h3>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white dark:bg-neutral-900 shadow-sm">
                    {result.confidence}% Confidence
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-green-600" />
                    Organic Remedies
                  </h4>
                  <ul className="space-y-2">
                    {result.treatments.organic.map((treatment, idx) => (
                      <li key={idx} className="flex items-start text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded-lg border border-l-4 border-l-green-500">
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-lg flex items-center mt-6">
                    <ShieldAlert className="mr-2 h-5 w-5 text-blue-600" />
                    Chemical Remedies
                  </h4>
                  <ul className="space-y-2">
                    {result.treatments.chemical.map((treatment, idx) => (
                      <li key={idx} className="flex items-start text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded-lg border border-l-4 border-l-blue-500">
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-lg flex items-center mt-6">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-orange-600" />
                    Fertilizer Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {result.treatments.fertilizer.map((treatment, idx) => (
                      <li key={idx} className="flex items-start text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded-lg border border-l-4 border-l-orange-500">
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px]">
                <ShieldAlert className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Upload a leaf image and click analyze to run the pipeline.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
