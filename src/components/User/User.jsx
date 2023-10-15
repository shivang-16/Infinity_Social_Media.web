import React from 'react'
import user2Img from '../../assets/user.png'
import { Link } from 'react-router-dom'
const User = ({userName, name, userId}) => {
  return (
    <Link to={`/user/${userId}`}>
   
    <div className="user">
                 
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