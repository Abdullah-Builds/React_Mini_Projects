import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
    
  const[number,setnumber] = useState(false);
  const[char,setchar] = useState(false);
  const[length,setlength] = useState(8);
  const[password,setpassword] = useState("");
  const passwordRef = useRef(null);

  const Password_Generator = useCallback(()=>{
    let code = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   
    if(number) str += "0123456789"
    if(char)   str += "@#$%^&*-_+=[]{}~`"

    for(let i=0; i<length; i++){
      const random = Math.floor(Math.random()*str.length + 1)
      code += str.charAt(random)
    }
    setpassword(code)
    
  },[number,char,length])

  const Copy_to_Clipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }, [password]);
   

  useEffect(()=>{
    Password_Generator();
  },[Password_Generator])

  return (
    <>
    <div className="bg-gray-800 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 mt-30 border-8 border-amber-400 text-orange-500">
      <h1 className='text-center font-bold text-2xl '>Password Generator</h1>
      <div className="flex items-center space-x-2 m-5">

       <input type="text" className="flex-grow border-4 text-white rounded-2xl bg-transparent px-4 py-3" readOnly value={password} ref={passwordRef}/>
       <button onClick={Copy_to_Clipboard} className="rounded-2xl px-3 py-2 border-4 border-amber-600 hover:bg-amber-600 hover:text-black transition whitespace-nowrap">Copy</button>
     </div>

     <div className='flex  items-center space-x-1 rounded-2xl p-3 border-white border-2 '>

      <input onChange={(e)=>{setlength(e.target.value)}} type = "range" max={100} min={8} defaultValue = {length} className='bg-amber-300 cursor-pointer'/> 
      <label >Length</label>

      <input onChange={()=>{setnumber((prev) => !prev)}} type='checkbox' defaultChecked={number} id="numberinput" className="ml-2"/>
      <label >Numbers</label>

      <input onChange={()=>{setchar((prev) => !prev)}} type='checkbox' defaultChecked={char} id="charinput" className='mr-2 ml-1'/>
      <label>Characters</label>

     </div>
  </div>

    </>
  )
}

export default App
