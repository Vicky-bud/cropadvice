import { apiFetch } from "@/lib/api"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Thermometer, Wind, Sprout, Bug } from "lucide-react"

export default function DashboardOverview() {
  const [weather, setWeather] = useState<any>(null)
  const [loadingWeather, setLoadingWeather] = useState(true)
  const [history, setHistory] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  
  // Profile editing state
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    farm_size_acres: '',
    primary_soil_type: '',
    location: '',
    latitude: null as number | null,
    longitude: null as number | null
  })
  const [savingProfile, setSavingProfile] = useState(false)
  const [locating, setLocating] = useState(false)

  const handleEditProfile = () => {
    setEditForm({
      farm_size_acres: profile?.farm_size_acres || '',
      primary_soil_type: profile?.primary_soil_type || '',
      location: profile?.location || '',
      latitude: profile?.latitude || null,
      longitude: profile?.longitude || null
    })
    setIsEditing(true)
  }

  const handleGetLocation = () => {
    setLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          const data = await res.json()
          const city = data.address.city || data.address.town || data.address.village || data.address.county
          const state = data.address.state
          if (city && state) {
            setEditForm(prev => ({ ...prev, location: `${city}, ${state}`, latitude, longitude }))
          } else if (data.display_name) {
            setEditForm(prev => ({ ...prev, location: data.display_name.split(",").slice(0, 2).join(", "), latitude, longitude }))
          } else {
            setEditForm(prev => ({ ...prev, latitude, longitude }))
          }
        } catch (e) {
          console.error("Geocoding failed", e)
          // Still save coordinates even if reverse geocoding fails
          const { latitude, longitude } = position.coords
          setEditForm(prev => ({ ...prev, latitude, longitude }))
        } finally {
          setLocating(false)
        }
      }, (error) => {
        console.error("Geolocation error", error)
        setLocating(false)
        alert("Could not get your location. Please check browser permissions.")
      })
    } else {
      setLocating(false)
      alert("Geolocation is not supported by your browser.")
    }
  }

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    try {
      const res = await apiFetch("/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          farm_size_acres: editForm.farm_size_acres ? parseFloat(editForm.farm_size_acres) : null,
          primary_soil_type: editForm.primary_soil_type || null,
          location: editForm.location || null,
          latitude: editForm.latitude,
          longitude: editForm.longitude
        })
      })
      if (res.ok) {
        const updatedProfile = await res.json()
        setProfile(updatedProfile)
        setIsEditing(false)
        
        // Refetch Weather based on new profile location
        setLoadingWeather(true)
        try {
          const wRes = await apiFetch("/api/weather/")
          if (wRes.ok) setWeather(await wRes.json())
        } catch (e) {
          console.error("Failed to fetch weather after profile update", e)
        } finally {
          setLoadingWeather(false)
        }
      }
    } catch (e) {
      console.error("Failed to update profile", e)
    } finally {
      setSavingProfile(false)
    }
  }

  useEffect(() => {
    async function fetchDashboardData() {
      // Fetch Weather
      try {
        const wRes = await apiFetch("/api/weather/")
        if (wRes.ok) setWeather(await wRes.json())
      } catch (e) {
        console.error("Failed to fetch weather", e)
      } finally {
        setLoadingWeather(false)
      }
      
      // Fetch History
      try {
        const hRes = await apiFetch("/api/profile/activity")
        if (hRes.ok) setHistory(await hRes.json())
      } catch (e) {
        console.error("Failed to fetch history", e)
      } finally {
        setLoadingHistory(false)
      }
      
      // Fetch Profile
      try {
        const pRes = await apiFetch("/api/profile/")
        if (pRes.ok) setProfile(await pRes.json())
      } catch (e) {
        console.error("Failed to fetch profile", e)
      }
    }
    
    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back to CropAdvice. Here's what's happening on your farm today.
        </p>
      </div>

      {/* Weather Widget */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingWeather ? "..." : `${weather?.temp}°C`}</div>
            <p className="text-xs text-muted-foreground">
              {profile?.location ? `In ${profile.location}` : "Default location"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingWeather ? "..." : `${weather?.humidity}%`}</div>
            <p className="text-xs text-muted-foreground">Optimal for most crops</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
            <Wind className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingWeather ? "..." : `${weather?.windSpeed} km/h`}</div>
            <p className="text-xs text-muted-foreground">Current wind speed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Condition</CardTitle>
            <Cloud className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingWeather ? "..." : weather?.condition}</div>
            <p className="text-xs text-muted-foreground">Overall weather</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            {loadingHistory ? (
              <div className="flex h-full min-h-[200px] items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading history...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">No recent activities found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 rounded-lg border p-3">
                    <div className={`rounded-full p-2 ${item.type === 'crop_recommendation' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {item.type === 'crop_recommendation' ? <Sprout className="h-4 w-4" /> : <Bug className="h-4 w-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 opacity-60">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Farm Overview</CardTitle>
            {!isEditing && (
              <button 
                onClick={handleEditProfile}
                className="text-xs font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Edit
              </button>
            )}
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Area (Acres)</label>
                  <input 
                    type="number" 
                    value={editForm.farm_size_acres} 
                    onChange={(e) => setEditForm({...editForm, farm_size_acres: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="e.g. 50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Soil Type</label>
                  <input 
                    type="text" 
                    value={editForm.primary_soil_type} 
                    onChange={(e) => setEditForm({...editForm, primary_soil_type: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="e.g. Loamy"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={editForm.location} 
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="e.g. Pune, Maharashtra"
                    />
                    <button 
                      onClick={handleGetLocation}
                      disabled={locating}
                      title="Use current location"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                    >
                      {locating ? "..." : "📍"}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-green-600 text-primary-foreground shadow hover:bg-green-700 h-9 px-4 py-2 w-full"
                  >
                    {savingProfile ? "Saving..." : "Save"}
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="text-sm font-medium">Total Area</span>
                  <span className="text-sm text-muted-foreground">{profile?.farm_size_acres ? `${profile.farm_size_acres} Acres` : 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="text-sm font-medium">Primary Soil Type</span>
                  <span className="text-sm text-muted-foreground capitalize">{profile?.primary_soil_type || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-sm font-medium">Location</span>
                  <span className="text-sm text-muted-foreground">{profile?.location || 'Not set'}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
