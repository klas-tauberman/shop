'use client'

import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Order {
  id: number
  customer_email: string
  total_amount: number
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchOrders()
    }
  }, [session])

  if (status === 'loading' || loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F9F4F1] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4">{order.id}</td>
                          <td className="p-4">{order.customer_email}</td>
                          <td className="p-4">{order.total_amount} SEK</td>
                          <td className="p-4">{order.status}</td>
                          <td className="p-4">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">No orders found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

