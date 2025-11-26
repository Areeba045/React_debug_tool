"use client"


import { Copy } from "lucide-react"
import CodeEditor from "./code-editor"
import ErrorInput from "./error-input"
import { useRef } from "react"




interface Inputsection {
  code: string
  setCode : (value : string) => void ; 
  error : string ;
  setError : (value : string) => void;
  onAnalyze : () => void;
}

export default function CodeInputSection({code , error , setCode , setError , onAnalyze} : Inputsection) {
const editerRef = useRef<{getValue : () => string}>(null)

const handelCopy = () => {
  const textCopy = editerRef.current?.getValue() || "";
  navigator.clipboard.writeText(textCopy)
}

//  const handelCopy =() => {
//   navigator.clipboard.writeText(code);
//  }

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Your Code
          </h2>
          <div className="flex gap-2">
            <button onClick={handelCopy}
            className="p-1.5 hover:bg-blue-900/20 rounded transition text-blue-300">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <CodeEditor ref={editerRef} value={code} onChange={setCode} placeholder="Paste your code here..." />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          Error Message
        </h2>
        <ErrorInput value={error} onChange={setError} />
      </div>

      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg"
      onClick={() => {onAnalyze()}}>
        Analyze with AI
      </button>
    </div>
  )
}









