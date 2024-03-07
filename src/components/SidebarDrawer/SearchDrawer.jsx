// SidebarDrawer.js
import React, { useState } from "react";
import photo from "../../assets/user.png";
import searchImg from "../../assets/search.png";
import "./SidebarDrawer.scss";
import { SearchUserProfile } from "../../redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User";

const SearchDrawer = ({ isOpen, onClose }) => {
  const [serachQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.searchUser);

  const handleSearch = () => {
    dispatch(SearchUserProfile(serachQuery));
  };

  return (
    <div className={`sidebar-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="drawer-header">
          <img src={photo} alt="" />
          <div className="input-section">
            <input
              type="text"
              placeholder="Search..."
              value={serachQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
            />
            <button>
              <img src={searchImg} alt="" />
            </button>
          </div>
        </div>
        <div className="searched-user">
          {users
            ? users.map((element, index) => {
                const { name, userName, _id, avatar } = element;
                return (
                  <div className="suggestions" key={index}>
                    <User
                      userId={_id}
                      userName={userName}
                      name={name}
                      avatar={avatar?.url}
                    />
                  </div>
                );
              })
            : "No users found"}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
