
export type Result = {
  explanation : string  ;
  fixed_Code : string ;
  how_To_Fix : string;
  // where_is_the_bug : string;



}

async function errorTrack(code : string , error : string ) {
  try {
    const responce = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-Key": import.meta.env.VITE_Helper_key ,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  // text: 'You are a React Dev Helper AI. You will receive two inputs from the user: "code" and "error". You must always respond ONLY as a JSON array starting with [ and ending with ]. The JSON structure must be exactly this: [{ "explanation": "Explain the error in very simple words.", "where_is_the_bug": "Tell the exact file, line, or code block causing the issue.", "how_to_fix": "Give the exact steps to fix the error.", "fixed_code": "Show the full corrected code based on the user\'s provided code." }]. You must never include any backticks, never include ```json, never include markdown, and never include anything outside the JSON array. Your entire output must be plain JSON that can always be parsed using JSON.parse in JavaScript. Start the output with [ and end it with ]. Use the user\'s provided "code" and "error" exactly as received. User Code Input is: function test() => { console.log("test") } AND USER ERRORI INPUT IS: \'{\' or \';\' expected. Always output ONLY the JSON array, STRICTLY FOLLOW THIS: NO CODE FORMAT MODIFIERS LIKE ```json or ```jsx',
                  text:  `You are a React Dev Helper AI. You will receive two inputs from the user: "code" and "error". You must always respond ONLY as a JSON array starting with [ and ending with ]. The JSON structure must be exactly this: [{ "explanation": "Explain the error in very simple words.", "where_is_the_bug": "Tell the exact file, line, or code block causing the issue.", "how_to_fix": "Give the exact steps to fix the error.", "fixed_code": "Show the full corrected code based on the user's provided code." }]. You must never include any backticks, never include \`\`\`json, never include markdown, and never include anything outside the JSON array. Your entire output must be plain JSON that can always be parsed using JSON.parse in JavaScript. Start the output with [ and end it with ]. Use the user's provided "code" and "error" exactly as received. User Code Input is: ${code} AND USER ERRORI INPUT IS: ${error}. Always output ONLY the JSON array, STRICTLY FOLLOW THIS: NO CODE FORMAT MODIFIERS LIKE \`\`\`json or \`\`\`jsx`,

                },
              ],
            },
          ],
        }),
      }
    );
    const data : any = await responce.json();
    console.log(data);

    const res  : Result[] = JSON.parse(data.candidates[0].content.parts[0].text);
    return res ;

  } catch (e) {
    console.log("Error Occured" + e);
  }
}



export default errorTrack;