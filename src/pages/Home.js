import React from 'react'
import {useState,useEffect} from 'react'
import {collection,getDocs} from 'firebase/firestore'
import {auth, db} from '../firebase-config'
import { doc, deleteDoc } from "firebase/firestore";

function Home({isAuth}) {
  const [postList,setPostList]=useState([]);
  const deletePost=async (key)=>{
    await deleteDoc(doc(db, "posts", key));
    const newPostList=postList.filter((post)=>{return post.doc_key!=key;});
    setPostList(newPostList);
  }
  useEffect(()=>{
    const getPostList=async ()=>{
      const data=await getDocs(collection(db,"posts"));
      const posts=[];
      data.docs.forEach((doc) => {
        // console.log(doc._document.data.value.mapValue.fields.user.mapValue.fields.key, " => ", doc.data());
        const obj=doc._document.data.value.mapValue.fields;
        const post={
          title:obj.title.mapValue.fields.title.stringValue,
          postText:obj.Post.mapValue.fields.postText.stringValue,
          user:{key:obj.user.mapValue.fields.key.stringValue,
            name:obj.user.mapValue.fields.name.stringValue},
            doc_key:doc._document.key.path.segments[6]
          };
          posts.push(post);
          setPostList(posts);
      });
    }
    getPostList();
  });
  return (
    <div className='homePage'>{
      postList.map(post=>{
        return <div className='post'>
          <div className='postHeader'>
            <h2 className='title'>{post.title}</h2>
            {isAuth&&auth.currentUser.uid==post.user.key&&<div className='deletePost'>
              <button onClick={()=>deletePost(post.doc_key)}>&#128465;</button>
            </div>}
          </div>
          <div className='postTextContainer'>{post.postText}</div>
          <div>By {post.user.name}</div>
        </div>
      })
    }</div>
  )
}

export default Home