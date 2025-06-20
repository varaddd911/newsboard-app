'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState<string | null>(null)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('userEmail')
    if (storedUser) setUser(storedUser)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setLoading(true)
    try {
      const endpoint = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT_AUTH + (authMode === 'login' ? '/login' : '')
      const payload: any = { email, password }
      if (authMode === 'signup') payload.name = name
      const res = await fetch(endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.message?.toLowerCase().includes('success')) {
        if (authMode === 'login') {
          setUser(email)
          localStorage.setItem('userEmail', email)
          setEmail('')
          setPassword('')
          setName('')
        } else {
          setAuthError('Sign up successful! Please log in.')
          setAuthMode('login')
          setPassword('')
        }
      } else {
        setAuthError(data.message || 'Authentication failed')
      }
    } catch (err: any) {
      setAuthError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('userEmail')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return alert('Please select an image.')
    setLoading(true)
    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1]
          resolve(base64String)
        }
        reader.onerror = (error) => reject(error)
      })
    try {
      const base64Image = await toBase64(imageFile)
      const payload = {
        title,
        description,
        image: base64Image,
        fileName: imageFile.name,
        fileType: imageFile.type,
        email: user,
      }
      const res = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        alert('Upload successful!')
        setTitle('')
        setDescription('')
        setImageFile(null)
      } else {
        alert(`Upload failed: ${data.error}`)
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center">
      <Navbar />
      <div className="flex-1 w-full flex items-center justify-center p-4">
        {!user ? (
          <form
            onSubmit={handleAuth}
            className="w-full max-w-md bg-white/90 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8 border border-blue-100"
          >
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-2 drop-shadow">
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </h2>
            <div className="flex justify-center mb-4 gap-4">
              <button type="button" onClick={() => setAuthMode('login')} className={`px-4 py-2 rounded-lg font-semibold ${authMode === 'login' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>Login</button>
              <button type="button" onClick={() => setAuthMode('signup')} className={`px-4 py-2 rounded-lg font-semibold ${authMode === 'signup' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>Sign Up</button>
            </div>
            {authMode === 'signup' && (
              <div>
                <label className="block text-base font-semibold text-blue-700">Name</label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-blue-200 rounded-lg p-3 bg-blue-50 text-blue-900"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-base font-semibold text-blue-700">Email</label>
              <input
                type="email"
                className="mt-2 block w-full border border-blue-200 rounded-lg p-3 bg-blue-50 text-blue-900"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-700">Password</label>
              <input
                type="password"
                className="mt-2 block w-full border border-blue-200 rounded-lg p-3 bg-blue-50 text-blue-900"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {authError && <div className="text-red-500 text-center">{authError}</div>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg text-white shadow transition-all duration-200 ${loading ? 'bg-blue-300' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
            >
              {loading ? (authMode === 'login' ? 'Logging in...' : 'Signing up...') : (authMode === 'login' ? 'Login' : 'Sign Up')}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white/90 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8 border border-blue-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow">Upload News</h2>
              <button type="button" onClick={handleLogout} className="ml-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200">Logout</button>
            </div>
            <p className="text-center text-gray-500 mb-6">Share the latest news with the world!</p>
            <div>
              <label className="block text-base font-semibold text-blue-700">Title</label>
              <input
                type="text"
                className="mt-2 block w-full border border-blue-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-700">Description</label>
              <textarea
                className="mt-2 block w-full border border-blue-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-blue-700">Image</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full border border-blue-200 rounded-lg bg-blue-50 text-blue-900"
                onChange={handleImageChange}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg text-white shadow transition-all duration-200 ${loading ? 'bg-blue-300' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
            >
              {loading ? 'Uploading...' : 'Submit News'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
