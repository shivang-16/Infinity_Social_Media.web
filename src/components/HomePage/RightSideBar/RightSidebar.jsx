import React from "react";
import "./rightsidebar.scss";
import { Link } from "react-router-dom";
import profile from "../../../assets/profilepic.jpg";
import userImg from "../../../assets/user2.jpg";
import user2Img from "../../../assets/user.png";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);

  return (
    <>
      <div className="right-main">
        <div className="rightSidebar-header">
          <div className="userImg">
            <img src={userImg} alt="" />
          </div>
          {user ? (
            <div className="userDetail">
            <div className="username">
              <p>{user.userName}</p>
            </div>
            <div className="name">
              <p>{user.name}</p>
            </div>
          </div>
          ):(<p>Login first</p>)}
          
          <div className="btn">
            <Link to="/profile">
              <button>View</button>
            </Link>
          </div>
        </div>
        <div className="rightSidebar-content">
          <div className="content-heading">
            <p>Suggested for you</p>
            <Link to="/connect">
              <p>See all</p>
            </Link>
          </div>
          <div className="content-body">
         {users ? ( 
           users.map((element, index)=>{
             const {name, userName} = element
            return (
              <div className="suggestions" key={index}>
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
              <div className="btn">
                <Link to="#">
                  <button>Follow</button>
                </Link>
              </div>
            </div>
            )
           })
         ) : (
          "No users found"
          )}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
