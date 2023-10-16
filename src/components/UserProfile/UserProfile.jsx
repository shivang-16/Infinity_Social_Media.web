import React from 'react'
import LeftSidebar from '../HomePage/LeftSideBar/LeftSidebar'
import RightSidebar from '../HomePage/RightSideBar/RightSidebar'
import photo from '../../assets/user.png'
import { Link } from 'react-router-dom'
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
import { useSelector } from 'react-redux'
import './userProfile.scss'
import PostBody from '../Posts/PostBody'


const Users = () => {
  const { users } = useSelector((state) => state.userProfile);
  const { posts } = useSelector((state)=> state.userposts);

  return (
    <>
    <main>
      <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className="main-box middle-section">
        <div className="user_details">
        <div className="user_section profile_details">
        <div className="profile_box profile_photo">
          <div className="image">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png' alt="No image"/>
          </div>
        </div>
        {users ? (
          users.map((element, index)=> {
            const {userName, name, followers, following} = element
             return(
              <div className="profile_box profile_content" key={index}>
              <div className="content_box user_name">
             
                <h4>{userName}</h4>
               
               
              </div>
              <div className="content_box followers_section">
                <span>0 Posts</span>
                <Link to="/followers">
                  <span>{followers.length} Followers</span>
                </Link>
                <Link to="/following">
                  <span>{following.length}  Following</span>
                </Link>
              </div>
              <div className="content_box user_descripton">
                <h3>{name}</h3>
                <p>Hi i am {`${name}`}</p>
                <p>23 Feb 2005</p>
                <p>{`github.com/${userName}`}</p>
              </div>
            </div>
             )
          })

        ):(
          <h2>Not found</h2>
        )}
       
      </div>
          <div className="user_section post_details">
            <div className="post_details_header">
              <Link to="#">
                <div className="post detail_box">
                  <img src={post} alt="" />
                  <span>Posts</span>
                </div>
              </Link>
              <Link to="#">
                <div className="bookmark detail_box">
                  <img src={bookmark} alt="" />
                  <span>Bookmark</span>
                </div>
              </Link>
            </div>
            <div className="post_detail_content">
            {posts ? (
          posts.map((element)=>{
            const {caption, _id, likes, owner } = element 
            return (
            <PostBody
              key={_id}
              caption={caption}
              _id = {_id}
              likes ={likes}
              owner = {owner}
            />
            )
          })
        ):(
          "No post found"
        )}
            </div>
          </div>
        </div>

        <div className="box right_sidebar">
          <RightSidebar />
        </div>
      </div>
    </main>
  </>
  )
}

export default Users