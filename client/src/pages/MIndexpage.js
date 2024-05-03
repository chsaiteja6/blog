import React, { useEffect, useState } from 'react'
import Post from '../Post'
export default function Indexpage() {
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    try {
      fetch('http://localhost:8000/post')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(posts => {
          setPosts(posts);
        })
        .catch(error => {
          // Handle any fetch-related errors here
          console.error('Error fetching posts:', error);
          // Optionally, you can set an error state or display an error message to the user
        });
    } catch (error) {
      // Handle any other errors that might occur outside of the fetch operation
      console.error('Error in useEffect:', error);
      // Optionally, you can set an error state or display an error message to the user
    }
  }, []);
  
  return (
    <div>
    {posts.length>0 && posts.map(post=>(
       <Post {...post}/>
    ))}

    </div>
  )
}
