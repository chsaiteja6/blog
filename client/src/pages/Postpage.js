import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Usercontext } from '../Usercontext';
import editImage from './edit.png'
export default function Postpage() {
    const {id}=useParams();
    const {userinfo}=useContext(Usercontext);
    const [pinfo,setinfo]=useState(null)
    useEffect(()=>{
      fetch(`http://localhost:8000/post/${id}`).then(response=>{
        response.json().then(info=>{
            setinfo(info);
           
        })
      })
    },[]);
    if(!pinfo)return ''
  return (
    <div className='post-page'>
        <h1>{pinfo.title}</h1>
        <time>{pinfo.createdAt}</time>
        <div className='author'>By {pinfo.author.name}</div>
        {userinfo.id===pinfo.author._id&&(
            <div className='edit-row'>
                < Link className='edit-btn' to={`/edit/${pinfo._id}`}>
                    <img className='png' src={editImage}/>
                    Edit this Post
                    </Link>
            </div>
        )} 
      <div className='image'>
      <img src={`http://localhost:8000/${pinfo.cover}`}/>
      </div>
      <div>
        
        <div className='content' dangerouslySetInnerHTML={{__html:pinfo.content}}/>
        </div>

    </div>
  )
}
