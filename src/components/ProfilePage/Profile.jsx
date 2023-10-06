import React from 'react'
import LeftSidebar from '../HomePage/LeftSideBar/LeftSidebar'
import '../ProfilePage/profile.scss'
import photo from '../../assets/profilepic.jpg'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
   <>
   <main>
      <div className="main-box left_sidebar">
      <LeftSidebar/>
      </div>
      <div className="main-box middle-section">
         <div className="user_details">
        <div className="user_section profile_details">
           <div className="profile_box profile_photo">
            <div className="image"><img src={photo} alt="" /></div>
           </div>
           <div className="profile_box profile_content">
                <div className="content_box user_name">
                   <span>shivang_18</span>
                   <button>Edit Profile</button>
                </div>
                <div className="content_box followers_section">
                   <span>0 Posts</span>
                   <Link to='/followers'>    
                   <span>100 Followers</span></Link>
                   <Link to='/following'>
                   <span>200 Following</span></Link>
                </div>
                <div className="content_box user_descripton">
                  <h4>Shivang Yadav</h4>
                  <p>Full stack web Developer</p>
                  <p>23 Feb 2005</p>
                  <p>github.com/shivang-16</p>
                </div>
           </div>
        </div>
        <div className="user_section post_details">

        </div>
        </div>
      </div>
    
   </main>

   </>
  )
}

export default Profile