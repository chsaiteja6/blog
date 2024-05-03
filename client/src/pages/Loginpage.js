import React, { useContext } from 'react'
import { useState } from 'react';
import {Navigate} from "react-router-dom";
import { Usercontext } from '../Usercontext';
export default function Loginpage() {
  const [name,setname]=useState('');  
  const [password,setpassword]=useState(''); 
  const [redirect,setredirect]=useState(false);

  const {setinfo}=useContext(Usercontext);
  const login= async (e)=>{
    e.preventDefault();
    const response=await fetch('http://localhost:8000/login',{
        method: 'POST',
        body: JSON.stringify({name,password}),
        headers: {'Content-Type': 'application/json'},
        credentials:'include'
    })
    if(response.ok){

      response.json().then((info)=>{
        setinfo(info)
        setredirect(true);
      })
      
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div>
      <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder='username'  value={name} onChange={e=>{setname(e.target.value)}}></input>
        <input type='password' value={password}  onChange={e=>{setpassword(e.target.value)}}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
