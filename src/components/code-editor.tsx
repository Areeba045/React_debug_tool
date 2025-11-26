"use client"

import { useMemo , forwardRef , useImperativeHandle , useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}



 const  CodeEditor = forwardRef(({ value, onChange, placeholder }: CodeEditorProps , ref) => {
  
  const lines = useMemo(() => value.split("\n"), [value])
  const textRef = useRef<HTMLTextAreaElement>(null);


  useImperativeHandle(ref , () => ({
    getValue : () => textRef.current?.value || ""
  }))
  return (
    <div className="relative rounded-lg overflow-hidden border border-blue-900/30 bg-slate-900/50 backdrop-blur-sm shadow-lg">
      <div className="flex">
        {/* Line numbers */}
        <div className="bg-slate-950/50 border-r border-blue-900/20 px-4 py-4 select-none">
          <div className="space-y-0 font-mono text-sm text-blue-500/50">
            {lines.map((_, i) => (
              <div key={i} className="h-6 leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Code input */}
        <div className="flex-1 relative">
          <textarea
            ref={textRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-80 p-4 bg-transparent text-slate-100 font-mono text-sm resize-none outline-none placeholder-slate-600"
            spellCheck="false"
          />
          <div className="absolute bottom-0 right-0 text-xs text-blue-400/40 p-2">{lines.length} lines</div>
        </div>
      </div>
    </div>
  )
}
)


export default CodeEditor;