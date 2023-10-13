import React from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import user2Img from '../../assets/user.png';
import { useSelector } from "react-redux";
import './connect.scss'



const Connect = () => {
  const { users } = useSelector((state) => state.users);

  return (
    <main>
      <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className="main-box middle-section">
        <div className="connect_people hello">

       <h2>Connect</h2>
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
    </main>
  );
};

export default Connect;
