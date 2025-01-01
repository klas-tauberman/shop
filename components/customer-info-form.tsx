'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Pencil } from 'lucide-react'

interface CustomerInfoFormProps {
  onComplete: (data: { email: string }) => void
}

export function CustomerInfoForm({ onComplete }: CustomerInfoFormProps) {
  const [email, setEmail] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onComplete({ email })
      setIsCompleted(true)
      setIsEditing(false)
    }
  }

  if (isCompleted && !isEditing) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-lg sm:text-xl font-medium">Kunduppgifter</h2>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Ändra
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">Email: {email}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-medium mb-2">1. Kunduppgifter</h2>
      <p className="text-gray-600 mb-4 sm:mb-6">
        Ange din emailadress för att få information om din beställning samt när det är dags för upphämtning.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Ange din emailadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-none text-base"
            required
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-black text-white hover:bg-black/90 rounded-full px-4 py-3 text-base font-normal"
        >
          Gå vidare
        </Button>
      </form>
    </div>
  )
}

