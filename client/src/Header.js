import React, { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import { Usercontext } from './Usercontext';


export default function Header() {
    const {setInfo,userinfo}=useContext(Usercontext);

  useEffect(() => {
  try {
    fetch('http://localhost:8000/profile', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        setInfo(json);
      })
      .catch(error => {
        // Handle any fetch-related errors here
        console.error('Error fetching profile:', error);
        // Optionally, you can set an error state or display an error message to the user
      });
  } catch (error) {
    // Handle any other errors that might occur outside of the fetch operation
    console.error('Error in useEffect:', error);
    // Optionally, you can set an error state or display an error message to the user
  }
}, []);




   const logout=async ()=>{
   await fetch('http://localhost:8000/logout',{
        method: 'POST',
        credentials:'include'
    })

    setInfo(null);
   }

   const username=userinfo?.name;
  return (
    
      <header>
        < Link to="/" className="logo">myBlog</Link>
        <nav>
            {username&&(
                <>
                <Link to="/create">create new post</Link>
                <a onClick={logout}>logout</a>
                </>
            )}
            {!username&&(
                <>
                <Link to="/login" className="">Login</Link>
                <Link to="/Register" className="">Register</Link>
                </>
            )}
          
        </nav>
      </header>
    
  )
}
