import React, {useState} from 'react'
import LeftSidebar from '../HomePage/LeftSideBar/LeftSidebar'
import { useSelector } from 'react-redux'
import PostBody from '../Posts/PostBody'
import Spinner2 from '../../Spinner/Spinner2'
import './comment.scss'

const Comment = () => {
 
    const {post} = useSelector((state)=> state.postById)

  return (
   <>
    <div className='comment-section'>
    <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className='comment-content'>
       
    {post ? (
        <PostBody
        key={post._id}
        caption={post?.caption}
        postId = {post._id}
        likes ={post.likes}
        owner = {post.owner}
        comments = {post.comments}
      />
    ) : (
        <Spinner2/>
    )}
    <div className='display-comments'>
        {
            post.comments.length != 0 ? (
              post.comments.map((element, index)=>{
                 const {comment} = element
                 return(
                    <div>
                        {comment}
                    </div>
                 )
              })
            ):(
                "No Comments"
            )
        }
     </div>
    </div>
     
    </div>
   </>
  )
}

export default Comment