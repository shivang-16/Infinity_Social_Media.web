import React from 'react'
import user2Img from '../../assets/user.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../actions/User'
import { getUserPost } from '../../actions/Post'

const User = ({userName, name, userId}) => {

    const dispatch = useDispatch()
    const handleGetUserProfile = ()=>{
        dispatch(getUserProfile(userName))
    }
    const handleGetUserPost = ()=>{
      dispatch(getUserPost(userId))
    }
    
  return (
    <Link to={`/user/${userName}`} >
   
    <div className="user" onClick={()=>{
      handleGetUserProfile();
      handleGetUserPost();
      }}>
                 
    <div className="userImg">
      <img src={user2Img} alt="" style={{'filter': 'invert(100%)'}}/>
    </div>
    <div className="userDetail">
      <div className="username">
        <p>{name}</p>
      </div>
      <div className="name">
        <p>{userName}</p>
      </div>
    </div>
     
    </div>
    </Link>
  )
}

export default User