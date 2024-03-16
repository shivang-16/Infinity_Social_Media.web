import { useEffect, useState } from "react";
import "./SidebarDrawer.scss";
import { SearchUserProfile } from "../../redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User";
import axios from "axios";
import { server } from "../../main";
import { getAllNotifications, getUnreadNotifications } from "../../redux/actions/Notifications";
import { useNavigate } from "react-router-dom";
import { getAllPost, getPostById } from "../../redux/actions/Post";
import likedImg from '../../assets/liked.png'
import commentImg from '../../assets/comment.png'
import userImg from '../../assets/user.png'
import bookmarkImg from '../../assets/bookmarksolid.png'

const NotificationDrawer = ({ isOpen, onClose }) => {
  // const [serachQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { users } = useSelector((state) => state.searchUser);
  const { notifications } = useSelector((state) => state.notifications)

  // const handleSearch = () => {
  //   dispatch(SearchUserProfile(serachQuery));
  // };

  const handleChangeStatus = async(id, refPost) =>{
    try {
      await axios.get(`${server}/notification/read/${id}`, {
          withCredentials: true
      });
      
      if(refPost !== null) {
        await dispatch(getPostById(refPost._id));
        navigate(`/post/${refPost._id}`);
      }
      await getUnreadNotifications()
    } catch (error) {
     console.log(error)
    }
  }

  return (
    <div className={`sidebar-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="drawer-header">
          <h3>Notifications</h3>
          {/* <p className="text-blue m-10">Mark all as read</p> */}
        </div>
        <div className="searched-user ">
          {notifications
            ? notifications.map((element, index) => {
                const {_id, sender, message, unread, refPost=null, tag } = element;
                return (
                  <div className={`${unread ? 'unread' : ''} noti-users`} key={index} onClick={() => handleChangeStatus(_id, refPost)}>
                  <div className="suggestions" >
                    <User
                      userId={sender?._id}
                      userName={sender?.userName}
                      name={sender?.name}
                      avatar={sender.avatar?.url}
                    />
                   
                  </div>
                  <div className="noti-content"> 
                   {
                    tag === "Liked" ? <img src={likedImg} style={{height:"30px"}}/> : tag === "Comment" ? <img src={commentImg}  style={{height:"30px"}}/> : tag === "Bookmark" ?  <img src={bookmarkImg} style={{height:"30px"}} /> : <img src={userImg} style={{height:"30px"}} />
                   }
                    
                    <span style={{margin:"10px"}}>{message}</span>
                    </div>
                  <div className="noti_caption noti-content">{refPost?.caption.slice(0,80)}...</div>
                 
                  </div>
                );
              })
            : "No users found"}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
