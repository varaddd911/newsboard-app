import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg py-4 px-4 md:px-6 mb-8 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-2xl font-bold text-white tracking-wide">NewsBoard</span>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div className={`flex-col md:flex-row md:flex space-y-2 md:space-y-0 md:space-x-4 items-center absolute md:static right-4 top-16 md:top-0 bg-gradient-to-r from-blue-600 to-purple-600 md:bg-none rounded-xl md:rounded-none shadow-lg md:shadow-none px-6 py-4 md:p-0 transition-all duration-200 ${open ? 'flex' : 'hidden md:flex'}`}>
          <Link href="/" className="text-white hover:bg-white/20 px-4 py-2 rounded transition font-medium block">Upload News</Link>
          <Link href="/news" className="text-white hover:bg-white/20 px-4 py-2 rounded transition font-medium block">All News</Link>
        </div>
      </div>
    </nav>
  )
}
