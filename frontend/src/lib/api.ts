export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers || {});
  
  if (token) {
    // Only set Authorization if not already set manually
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token is invalid or expired
    localStorage.removeItem("token");
    if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      window.location.href = "/login";
    }
  }

  return response;
}
