import React, { useState } from 'react'
import ReactQuill from "react-quill"
import {Navigate} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
export default function Createpost() {
  const [title,settitle]=useState('');
  const [summary,setsummary]=useState('');
  const [content,setcontent]=useState('');
  const [files,setfiles]=useState('');
  const [redirect,setredirect]=useState(false);
  const modules= {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats= [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
 const createnewpost=async (ev)=>{
    const data=new FormData();
    data.set('content',content);
    data.set('title',title);
    data.set('summary',summary);
    data.set('file',files[0]);
    ev.preventDefault();
   const response=await fetch('http://localhost:8000/post',{
      method: 'POST',
      body:data,
      credentials:'include',
    });
   if(response.ok){
     setredirect(true);
   }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
   <form onSubmit={createnewpost}>
     <input type="title" placeholder='title' value={title} onChange={e=>{settitle(e.target.value)}} />
     <input type="summary" placeholder='summary' value={summary} onChange={e=>{setsummary(e.target.value)}}/>
     <input type="file"  onChange={ev=>setfiles(ev.target.files)}/>
     <ReactQuill  value={content} modules={modules} formats={formats} onChange={newvalue=>setcontent(newvalue)}/>
     <button style={{marginTop:'5px'}} type='submit'>Create post</button>
   </form>
  )
}
