"use client"

import { useState } from "react"
import { Lightbulb, CheckCircle, Code2 } from "lucide-react"
import AnalysisTab from "./analysis-tab";




type TabType = "explanation" | "fixed" | "steps"


 type Result = {
  explanation : string  ;
  fixed_code : string ;
   how_to_fix : string;
  // where_is_the_bug : string;

}

type AnalysisProp = {
  data : Result[]
}

export default function AnalysisPanel({data}: AnalysisProp) {
  const [activeTab, setActiveTab] = useState<TabType>("explanation")
  const [isLoading] = useState(false)
  const [copied , setCopied] = useState(false);

    if (!data || data.length === 0) {
    return <p className="text-slate-400 text-center font-bold text-2xl">No analysis yet.</p>;
  }


  // build the string to copy depending on ui 

  const  getActive  =  () => {
    const items = data[0];
    if(!items) return "";

    if(activeTab === "explanation")
       return items.explanation || "";
       

    if(activeTab === "fixed")
      return items.fixed_code || "";
  
     
    if(activeTab === "steps")
       return items.how_to_fix || "";


     

  return "";


  }

  const copyActive = async () => {
    try{
      const text = getActive();
      if(!text) return
      await navigator.clipboard.writeText(text);
      setCopied(true);

    }catch(err){
      console.error("copied failed" , err)
    }
  } 
  
  

  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="sticky top-24">
        {/* Tab buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {setActiveTab("explanation") ; setCopied(false)}}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
              activeTab === "explanation" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Why</span>
          </button>
          <button
            onClick={() => {setActiveTab("fixed") ; setCopied(false) }}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
              activeTab === "fixed" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">Fixed</span>
          </button>
          <button
            onClick={() =>{ setActiveTab("steps"); setCopied(false)}}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
              activeTab === "steps" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Steps</span>
          </button>
        </div>

        {/* Tab content */}
        <div className="rounded-lg border border-blue-900/30 bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-lg">
          {isLoading ? (
            <div className="p-6 flex flex-col items-center justify-center min-h-96">
              <div className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 text-sm">Analyzing your code...</p>
            </div>
          ) : (
            <>
              {activeTab === "explanation" && data[0] && (
                <AnalysisTab title="Explanation" content={data[0]?.explanation} type="text" />
              )}
              {activeTab === "fixed" &&  data[0] && (<AnalysisTab title="Fixed Code" content={data[0]?.fixed_code} type="code"  onCopy={copyActive}/>)}
              {activeTab === "steps" && data[0] && (<AnalysisTab title="How to Fix" content={data[0]?.how_to_fix.split(".").filter(Boolean)} type="list" />)}
            </>
          )}
        </div>

        {/* Copy & Download buttons */}
        <div className="flex gap-2 mt-4">
          <button 
          onClick={copyActive}
          className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition text-sm font-semibold">
            {copied ? "copied!" : "copy"}
          </button>
          {/* <button className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition text-sm font-semibold">
            Export
          </button> */}
        </div>
      </div>
    </div>
  )
}
