"use client"

import { useEffect, useState } from "react"
import Navbar from "../Navbar"

interface NewsItem {
  title: string
  description: string
  image: string // base64 string
  fileName: string
  fileType: string
}

function getString(val: any) {
  if (typeof val === "string") return val
  if (val && typeof val === "object" && "S" in val) return val.S
  return ""
}

export default function NewsListPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT!, {
          method: "GET",
        })
        if (!res.ok) throw new Error("Failed to fetch news")
        const data = await res.json()
        setNews(data.news || data) // support both { news: [...] } and [...] formats
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center">
      <Navbar />
      <div className="flex-1 w-full flex flex-col items-center p-4">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-2 drop-shadow">All News</h2>
        <p className="text-center text-gray-500 mb-8">Browse the latest news shared by the community.</p>
        {loading && <div className="text-blue-600 font-semibold">Loading...</div>}
        {error && <div className="text-red-500 font-semibold">{error}</div>}
        <div className="w-full max-w-3xl space-y-8">
          {news.length === 0 && !loading && !error && (
            <div className="text-center text-gray-500">No news found.</div>
          )}
          {news.map((item, idx) => {
            const image = getString(item.image)
            const fileType = getString(item.fileType)
            let imageSrc = ""
            if (image.startsWith("http")) {
              imageSrc = image
            } else if (image && fileType) {
              imageSrc = `data:${fileType};base64,${image}`
            }
            return (
              <div key={idx} className="bg-white/90 rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 border border-blue-100 transition-all duration-200">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={getString(item.title)}
                    className="w-full h-48 md:w-56 md:h-56 object-cover rounded-xl border border-blue-200 shadow mb-4 md:mb-0"
                  />
                ) : (
                  <div className="w-full h-48 md:w-56 md:h-56 flex items-center justify-center bg-blue-100 rounded-xl text-blue-300 border border-blue-200 mb-4 md:mb-0">
                    No Image
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">{getString(item.title)}</h3>
                  <p className="text-lg text-gray-700 mb-2 break-words">{getString(item.description)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
