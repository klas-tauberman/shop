'use client'

import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Review {
  id: number
  product_id: string
  rating: number
  comment: string
  author: string
  created_at: string
  is_hidden: boolean
}

interface ReviewsProps {
  productId: string
}

export function Reviews({ productId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', author: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setError('Failed to load reviews. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReview, productId })
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      const newReviewData = await response.json()
      setReviews([newReviewData, ...reviews])
      setNewReview({ rating: 0, comment: '', author: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
      setError('Failed to submit review. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHideReview = async (id: number) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isHidden: true })
      })

      if (!response.ok) {
        throw new Error('Failed to hide review')
      }

      setReviews(reviews.filter(review => review.id !== id))
    } catch (error) {
      console.error('Error hiding review:', error)
      setError('Failed to hide review. Please try again later.')
    }
  }

  const visibleReviews = reviews.filter(review => !review.is_hidden)
  const averageRating = visibleReviews.reduce((sum, review) => sum + review.rating, 0) / visibleReviews.length || 0

  if (isLoading) return <div>Loading reviews...</div>

  return (
    <div className="space-y-8">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex items-center gap-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${star <= averageRating ? 'fill-[#ffca3a] text-[#ffca3a]' : 'text-[#c9c9c9]'}`}
            />
          ))}
        </div>
        <span className="text-lg font-medium">{averageRating.toFixed(1)} av 5</span>
        <span className="text-gray-500">({visibleReviews.length} recensioner)</span>
      </div>

      <form onSubmit={handleSubmitReview} className="space-y-4">
        <h3 className="text-xl font-medium">Lämna en recension</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewReview({ ...newReview, rating: star })}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${star <= newReview.rating ? 'fill-[#ffca3a] text-[#ffca3a]' : 'text-[#c9c9c9]'}`}
              />
            </button>
          ))}
        </div>
        <Input
          type="text"
          placeholder="Ditt namn"
          value={newReview.author}
          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
          required
        />
        <Textarea
          placeholder="Skriv din recension här"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-3 text-base font-normal"
        >
          {isSubmitting ? 'Skickar...' : 'Skicka recension'}
        </Button>
      </form>

      <div className="space-y-6">
        {visibleReviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? 'fill-[#ffca3a] text-[#ffca3a]' : 'text-[#c9c9c9]'}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{review.author}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleHideReview(review.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

