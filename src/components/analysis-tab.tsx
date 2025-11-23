"use client"

import { Copy } from "lucide-react"

interface AnalysisTabProps {
  title: string
  content: string | string[]
  type: "text" | "code" | "list"
}

export default function AnalysisTab({ title, content, type }: AnalysisTabProps) {
  if (type === "text") {
    return (
      <div className="p-5 space-y-3">
        <p className="text-slate-100 leading-relaxed text-sm">{content}</p>
      </div>
    )
  }

  if (type === "code") {
    const lines = (content as string)?.split("\n") || []
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-xs text-blue-300 font-semibold">FIXED CODE</p>
          <button className="p-1 hover:bg-blue-900/20 rounded transition">
            <Copy className="w-4 h-4 text-blue-400" />
          </button>
        </div>
        <div className="flex bg-slate-950/50">
          {/* Line numbers */}
          <div className="bg-slate-950/30 border-r border-blue-900/20 px-3 py-3 select-none">
            <div className="space-y-0 font-mono text-xs text-blue-500/50">
              {lines.map((_, i) => (
                <div key={i} className="h-6 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Code */}
          <pre className="flex-1 p-3 overflow-x-auto">
            <code className="font-mono text-xs text-slate-100">{content}</code>
          </pre>
        </div>
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className="p-5 space-y-3">
        {(content && Array.isArray(content) ? content : []).map((step, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </div>
            <p className="text-slate-100 text-sm leading-relaxed pt-0.5">{step}</p>
          </div>
        ))}
      </div>
    )
  }

  return null
}
