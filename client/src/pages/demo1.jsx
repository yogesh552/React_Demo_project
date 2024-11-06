import { useState } from 'react'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import {Link} from 'react-router-dom'

function Demo1(){
  const [count, setCount]=useState(0)
  

  function addValue(){
    setCount(count+1)
  }
  
  function lessValue(){
    let res=count
    if(res>0){
      res=count-1
    }else{
      alert("Count cann't be less than 0")
    }
    setCount(res)
    
  }

  function removeAllValue(){
    setCount(0)
  }



return(
  <>
    <div style={{background:'black',color:'white', height:'100vh'}} >
      <div>Count: {count}</div>
      <button onClick={addValue} style={{background:'green' ,color:'white', margin:'5px'}} >Add</button>
      <button onClick={lessValue} style={{background:'orange',color:'white', margin:'5px'}}>Less</button>
      <br/>
      <button onClick={removeAllValue} style={{background:'red',color:'white', margin:'5px'}}>Remove</button>
      <br />
      <Link to="/" style={{background:'gray',color:'white', margin:'5px'}}>
        <button>Back</button>
      </Link>
    </div>
  
  </>
)

}

export default Demo1