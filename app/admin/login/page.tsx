'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F4F1] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="rounded-full"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-black/90 rounded-full"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

