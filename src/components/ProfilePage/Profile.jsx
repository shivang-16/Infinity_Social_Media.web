import React, {useState} from "react";

import photo from "../../assets/profilepic.jpg";
import user2Img from '../../assets/user.png'
import "../ProfilePage/profile.scss";
import { useSelector } from "react-redux";
import User from "../User/User";
const Profile = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [isFollowersOpen, setFollowersOpen] = useState(false);
  const [isFollowingOpen, setFollowingOpen] = useState(false);

  const openFollowersPopup = () => {
    setFollowersOpen(true);
  };

  const closeFollowersPopup = () => {
    setFollowersOpen(false);
  };

  const openFollowingPopup = () => {
    setFollowingOpen(true);
  };

  const closeFollowingPopup = () => {
    setFollowingOpen(false);
  };
  return (
    <>
      <div className="user_section profile_details">
        <div className="profile_box profile_photo">
          <div className="image">
            <img src={photo} alt="" />
          </div>
        </div>
        {user ? (
 <div className="profile_box profile_content">
          <div className="content_box user_name">
         
            <span>{user.userName}</span>
            <button>Edit Profile</button>
          </div>
          <div className="content_box followers_details_section">
            <div >
            <p>{user.posts.length} Posts</p>
            </div>
              <div onClick={openFollowersPopup}>
              <p>{user.followers.length} Followers</p>
              </div>
               <div onClick={openFollowingPopup}>

              <p>{user.following.length}  Following</p>
               </div>
        
          </div>
          <div className="content_box user_descripton">
            <h4>{user.name}</h4>
            <p>Full stack web Developer</p>
            <p>23 Feb 2005</p>
            <p>github.com/shivang-16</p>
          </div>
        </div>
        ):(
          <h2>Not found</h2>
        )}
       
      </div>

      {isFollowersOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ "marginBottom": "10px" }}>
              <h2>Followers</h2>
            </div>
            <span className="close-icon" onClick={closeFollowersPopup}>
              &times;
            </span>
            {
            user.followers.length != 0 ? (
              user.followers.map((element)=>{
                const {_id, userName, name} = element
                return(
                  <User 
                  key={_id}
               userId={_id} 
               userName={userName} 
               name={name}
               avatar={user2Img}
               />
                )
              })
            ):(
               "Not followed anyone"
            )
           }
          </div>
        </div>
      )}

      {isFollowingOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ "marginBottom": "10px" }}>
              <h2>Following</h2>
            </div>
            <span className="close-icon" onClick={closeFollowingPopup}>
              &times;
            </span>
            {
            user.following.length != 0 ? (
              user.following.map((element)=>{
                const {_id, userName, name} = element
                return(
                  <User 
                  key={_id}
               userId={_id} 
               userName={userName} 
               name={name}
               avatar={user2Img}
               />
                )
              })
            ):(
               "Not followed anyone"
            )
           }
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
