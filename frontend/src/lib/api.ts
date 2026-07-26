import { supabase } from "./supabase"

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
  
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token

  const headers = new Headers(options.headers || {})
  
  if (token) {
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`)
    }
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      await supabase.auth.signOut()
      window.location.href = "/login"
    }
  }

  return response
}
