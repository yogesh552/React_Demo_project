import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Demo1 from './pages/demo1.jsx'
import Dashboard from './pages/dashboard.jsx'
import Demo2 from './pages/demo2.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} ></Route>
        <Route path="Demo1" element={<Demo1/>} ></Route>
        <Route path="Demo2" element={<Demo2/>} ></Route>

      </Routes>

    {/* <div>
      <Demo1 />
    </div> */}
    </>
    
  )
}


export default App



