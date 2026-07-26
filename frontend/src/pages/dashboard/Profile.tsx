import { apiFetch } from "@/lib/api"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, User, MapPin, Maximize, Sprout, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const profileSchema = z.object({
  location: z.string().min(2, "City name must be at least 2 characters").optional().or(z.literal('')),
  farm_size_acres: z.coerce.number().min(0).optional().or(z.literal('')),
  primary_soil_type: z.string().optional().or(z.literal('')),
  phone_number: z.string().optional().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [userData, setUserData] = useState<any>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: {
      location: "",
      farm_size_acres: "",
      primary_soil_type: "",
      phone_number: "",
    }
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token")
        const response = await apiFetch("/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
          
          if (data.profile) {
            reset({
              location: data.profile.location || "",
              farm_size_acres: data.profile.farm_size_acres || "",
              primary_soil_type: data.profile.primary_soil_type || "",
              phone_number: data.profile.phone_number || "",
            })
          }
        }
      } catch (err) {
        console.error("Failed to load profile", err)
      } finally {
        setIsFetching(false)
      }
    }
    
    fetchProfile()
  }, [reset])

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    // Convert empty strings to null for backend
    const payload = {
      location: data.location || null,
      farm_size_acres: data.farm_size_acres === "" ? null : data.farm_size_acres,
      primary_soil_type: data.primary_soil_type || null,
      phone_number: data.phone_number || null,
    }

    try {
      const token = localStorage.getItem("token")
      const response = await apiFetch("/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to update profile")
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and farm details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-4 text-center border rounded-xl bg-neutral-50 dark:bg-neutral-900">
              <div className="h-20 w-20 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg">{userData?.full_name}</h3>
              <p className="text-sm text-muted-foreground">{userData?.email}</p>
              <div className="mt-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                {userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Farm Information</CardTitle>
            <CardDescription>
              We use your location to fetch real-time weather data for the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    City Location
                  </label>
                  <Input placeholder="e.g. New Delhi" {...register("location")} />
                  {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Maximize className="w-4 h-4 mr-2 text-muted-foreground" />
                    Farm Size (Acres)
                  </label>
                  <Input type="number" step="any" placeholder="e.g. 50" {...register("farm_size_acres")} />
                  {errors.farm_size_acres && <p className="text-xs text-red-500">{errors.farm_size_acres.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Sprout className="w-4 h-4 mr-2 text-muted-foreground" />
                    Primary Soil Type
                  </label>
                  <Input placeholder="e.g. Loamy" {...register("primary_soil_type")} />
                  {errors.primary_soil_type && <p className="text-xs text-red-500">{errors.primary_soil_type.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    Phone Number
                  </label>
                  <Input placeholder="e.g. +1234567890" {...register("phone_number")} />
                  {errors.phone_number && <p className="text-xs text-red-500">{errors.phone_number.message}</p>}
                </div>
              </div>
              
              {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">{error}</div>}
              {success && <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">Profile updated successfully!</div>}
              
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
