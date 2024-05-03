import React, { useState } from 'react'
import {Navigate} from "react-router-dom";
export default function Registerpage() {
  const [name,setname]=useState('');  
  const [password,setpassword]=useState(''); 
  const [redirect,setredirect]=useState(false);
  const register= async (e)=>{
    e.preventDefault();
    try{
    const response=await fetch('http://localhost:8000/register',{
        method: 'POST',
        body: JSON.stringify({name,password}),
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
      setredirect(true);
    }
    console.log(response);
  }catch(e){
    
    throw e;
  }
    
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div>
      <form className='register' onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder='username'  value={name}  onChange={(e)=>setname(e.target.value)}></input>
        <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        <button type="submit"  >Register</button>
      </form>
    </div>
  )
}
