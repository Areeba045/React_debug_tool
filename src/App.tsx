import { useState } from "react"
import errorTrack   from "./utils/errorTrack";
import Result from './utils/errorTrack';
import Header from "./components/header";
import CodeInputSection from "./components/code-input-section"
import AnalysisPanel from "./components/analysis-panel"

export type Result = {
  explanation : string  ;
  fixed_Code : string ;
  how_To_Fix : string;
  // where_is_the_bug : string;



}


  
export default function App() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("");
  const [data , setData] = useState<Result[]>([]);
  const [isLoading , setIsLoading] = useState(false);



  const AnalyzeAi = async  () => {
    setIsLoading(true)
    try{
          console.log("clicked")
          const res =  await errorTrack(code , error)
          setData(res || []);

    }finally{
      setIsLoading(false)
    }

  }

    console.log("explanation "  , data)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CodeInputSection code={code} error={error} setCode={setCode} setError={setError} onAnalyze={AnalyzeAi}/>
          <AnalysisPanel data={data}  loading={isLoading}/>
        </div>
      </div>
    </main>
  );
}
