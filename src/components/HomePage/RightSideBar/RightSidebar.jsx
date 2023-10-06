import React from 'react'
import './rightsidebar.scss'
import { Link } from 'react-router-dom'
import profile from '../../../assets/profilepic.jpg'
import userImg from '../../../assets/user2.jpg'
import user2Img from '../../../assets/user.png'

const RightSidebar = () => {
  return (
    <>
    <div className="right-main">
 
    <div className='rightSidebar-header'>
      <div className="userImg">
        <img src={profile} alt="" />
      </div>
      <div className="userDetail">
        <div className="username">
          <p>shivang_18</p>
        </div>
        <div className="name">
          <p>Shivang Yadav</p>
        </div>
      </div>
      <div className='btn'>
      <Link to="#"><p>View</p></Link>
      </div>
    </div>
    <div className='rightSidebar-content'>
        <div className="content-heading">
          <p>Suggested for you</p>
           <Link to="#"><p>See all</p></Link>
        </div>
        <div className="content-body">
        <div className='suggestions'>
      <div className="userImg">
        <img src={userImg} alt="" />
      </div>
      <div className="userDetail">
        <div className="username">
          <p>16_mansi</p>
        </div>
        <div className="name">
          <p>Mansi Swaraj</p>
        </div>
       
      </div>
      <div className='btn'>
      <Link to="#"><p>Follow</p></Link>
      </div>
    </div>
    <div className='suggestions'>
      <div className="userImg">
        <img src={user2Img} alt="" />
      </div>
      <div className="userDetail">
        <div className="username">
          <p>lucky16</p>
        </div>
        <div className="name">
          <p>Lucky Yadav</p>
        </div>
      
      </div>
      <div className='btn'>
      <Link to="#"><p>Follow</p></Link>
      </div>
    </div>
        </div>
    </div>
         
    </div>
    </>
  )
}

export default RightSidebar