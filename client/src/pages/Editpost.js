import React from 'react'
import ReactQuill from "react-quill"
import {Navigate, useParams} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import {useState,useEffect} from 'react'
export default function Editpost() {
    const [title,settitle]=useState('');
  const [summary,setsummary]=useState('');
  const [content,setcontent]=useState('');
  const [files,setfiles]=useState('');
  const [redirect,setredirect]=useState(false);
const {id}=useParams();
useEffect(()=>{
 fetch('http://localhost:8000/post/'+id).then(response=>{
    response.json().then(postinfo=>{
        settitle(postinfo.title);
        setcontent(postinfo.content);
        setsummary(postinfo.summary)
    })
 })
},[])
  const updatepost=async (ev)=>{
    ev.preventDefault();
    const data=new FormData();
    data.set('content',content);
    data.set('title',title);
    data.set('summary',summary);
    data.set('id',id);
    if(files?.[0]){
        data.set('file',files?.[0]);
    }
    await fetch('http://localhost:8000/post',{
        method:'PUT',
        body:data,
        credentials:'include'
    });
    setredirect(true);
    console.log(files?.[0]);
  }
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
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
   <form onSubmit={updatepost}>
     <input type="title" placeholder='title' value={title} onChange={e=>{settitle(e.target.value)}} />
     <input type="summary" placeholder='summary' value={summary} onChange={e=>{setsummary(e.target.value)}}/>
     <input type="file"  onChange={ev=>setfiles(ev.target.files)}/>
     <ReactQuill  value={content} modules={modules} formats={formats} onChange={newvalue=>setcontent(newvalue)}/>
     <button style={{marginTop:'5px'}} type='submit'>update post</button>
   </form>
  )
}
