import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MiniLoto from './miniloto'
import Loto7 from './loto7'

function Home() {
  return (
    <div style={{background:"#0a0a1a",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,fontFamily:"system-ui"}}>
      <h1 style={{color:"#fff",fontSize:24}}>ロト分析アプリ</h1>
      <Link to="/mini" style={{padding:"16px 40px",background:"linear-gradient(135deg,#2196f3,#00bcd4)",color:"#fff",borderRadius:12,fontSize:18,fontWeight:700,textDecoration:"none"}}>ミニロト</Link>
      <Link to="/loto7" style={{padding:"16px 40px",background:"linear-gradient(135deg,#ff2d87,#ff6b35)",color:"#fff",borderRadius:12,fontSize:18,fontWeight:700,textDecoration:"none"}}>ロト7</Link>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/mini" element={<MiniLoto/>}/>
      <Route path="/loto7" element={<Loto7/>}/>
    </Routes>
  </BrowserRouter>
)
