import React from 'react'
import {useState,useEffect} from 'react'
import {auth} from '../firebase-config'
import { db } from '../firebase-config'
import {collection,addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
const CreatePost = ({isAuth}) => {
  const [title,setTitle]=useState("");
  const [postText,setPostText]=useState("");
  const collectionRef=collection(db,'posts')
  let navigate=useNavigate();
  const createPost=async()=>{
    await addDoc(collectionRef,{
      title:{title},
      Post:{postText},
      user:{name:auth.currentUser.displayName,key:auth.currentUser.uid }
    });
    navigate("/");
    console.log('Created a collection')
    //create a post in firebase firestore
  }
  useEffect(()=>{
    if(!isAuth)navigate("/login");
  },[])
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input placeholder="Title..." onChange={(event)=>{
            setTitle(event.target.value);
          }}/>
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea placeholder="Post..." onChange={(event)=>{
            setPostText(event.target.value);
          }}/>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost