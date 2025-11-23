"use client"

import { Zap } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-blue-900/30 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-sans">DevHelper</h1>
            <p className="text-xs text-blue-300">AI-Powered Code Debugger</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-200">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Ready to analyze</span>
        </div>
      </div>
    </header>
  )
}