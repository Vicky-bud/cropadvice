import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Leaf, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        throw error
      }

      navigate("/dashboard") // Will navigate to dashboard once built
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  async function onGoogleSignIn() {
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r overflow-hidden rounded-r-3xl shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1740&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-green-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/20 to-transparent" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Leaf className="mr-2 h-6 w-6" />
          CropAdvice
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "CropAdvice has completely transformed how I manage my farm. The AI recommendations have boosted my crop yield by 30% this season."
            </p>
            <footer className="text-sm">Sofia Davis, Farmer</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Welcome back
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Enter your email and password to sign in to your account
            </p>
          </div>
          
          <Card className="border-0 shadow-xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl text-center">Login</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
                    {error}
                  </div>
                )}
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-neutral-900 px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" type="button" onClick={onGoogleSignIn} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Google
                </Button>
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="underline hover:text-primary">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
