import { useState } from "react"
import errorTrack   from "./utils/errorTrack";
import Result from './utils/errorTrack';
import Header from "./components/header";
import CodeInputSection from "./components/code-input-section"
import AnalysisPanel from "./components/analysis-panel"

type Result = {
  explanation : string  ;
  fixed_code : string ;
   how_to_fix : string;
  // where_is_the_bug : string;

}


  
export default function App() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("");
  const [data , setData] = useState<Result[]>([]);


  const AnalyzeAi = async  () => {
    console.log("clicked")
    const res =  await errorTrack(code , error)
    setData(res || []);
  }

    console.log("explanation "  , data)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CodeInputSection code={code} error={error} setCode={setCode} setError={setError} onAnalyze={AnalyzeAi}/>
          <AnalysisPanel data={data} />
        </div>
      </div>
    </main>
  );
}
