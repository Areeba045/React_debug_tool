"use client"

import { AlertCircle } from "lucide-react"

interface ErrorInputProps {
  value: string
  onChange: (value: string) => void
}

export default function ErrorInput({ value, onChange }: ErrorInputProps) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-red-900/30 bg-red-950/20 backdrop-blur-sm shadow-lg">
      <div className="flex items-start gap-4 p-4">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-slate-100 font-mono text-sm resize-none outline-none placeholder-slate-600 min-h-24"
          placeholder="Paste your error message here..."
          spellCheck="false"
        />
      </div>
    </div>
  )
}
