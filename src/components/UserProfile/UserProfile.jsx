import React, { useState } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import user2Img from "../../assets/user.png";
import { Link } from "react-router-dom";
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
import { useSelector } from "react-redux";
import "./userProfile.scss";
import PostBody from "../Posts/PostBody";
import Spinner2 from "../Spinner/Spinner2";
import User from "../User/User";

const Users = () => {
  const { users, loading: ProfileLoading } = useSelector(
    (state) => state.userProfile,
  );
  const { posts } = useSelector((state) => state.userposts);
  const [isFollowersOpen, setFollowersOpen] = useState(false);
  const [isFollowingOpen, setFollowingOpen] = useState(false);

  const openFollowersPopup = () => {
    setFollowersOpen(true);
  };

  const openFollowingPopup = () => {
    setFollowingOpen(true);
  };

  const closePopup = () => {
    setFollowingOpen(false);
    setFollowersOpen(false);
  };
  return (
    <>
      <main>
        <div className="main-box left_sidebar">
          <LeftSidebar />
        </div>
        {ProfileLoading ? (
          <Spinner2 />
        ) : (
          <div className="main-box middle-section">
            <div className="user_details">
              <div className="user_section profile_details">
                {users ? (
                  users.map((element, index) => {
                    const {
                      userName,
                      name,
                      followers,
                      following,
                      posts,
                      description,
                      avatar,
                    } = element;
                    return (
                      <>
                        <div className="profile_box profile_photo">
                          <div className="image">
                            <img src={avatar.url} alt="No image" />
                          </div>
                        </div>

                        <div
                          className="profile_box profile_content"
                          key={index}
                        >
                          <div className="content_box user_name">
                            <h4>{userName}</h4>
                            {/* <button className="follow">Follow</button> */}
                          </div>
                          <div className="content_box followers_details_section">
                            <div>
                              <p>{posts.length} Posts</p>
                            </div>
                            <div onClick={openFollowersPopup}>
                              <p>{followers.length} Followers</p>
                            </div>
                            <div onClick={openFollowingPopup}>
                              <p>{following.length} Following</p>
                            </div>
                          </div>
                          <div className="content_box user_descripton">
                            <h3>{name}</h3>
                            {users && description ? (
                              <>
                                <p>{description.about}</p>
                                <p>{description.dob}</p>
                                <p>{description.location}</p>
                                <a href={`${description.link}`} target="_blank">
                                  {description.link}
                                </a>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <h2>Not found</h2>
                )}
              </div>
              <div className="user_section post_details">
                <div className="post_details_header">
                  <Link to="#">
                    <div className="posts detail_box">
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
                  {posts
                    ? posts.map((element) => {
                        const { caption, _id, likes, owner, comments, image } =
                          element;
                        return (
                          <PostBody
                            key={_id}
                            caption={caption}
                            postId={_id}
                            likes={likes}
                            owner={owner}
                            comments={comments}
                            image={image.url}
                          />
                        );
                      })
                    : "No post found"}
                </div>
              </div>
            </div>

            <div className="box right_sidebar">
              <RightSidebar />
            </div>
          </div>
        )}

        {users
          ? users.map((element) => {
              const { followers, following } = element;
              return (
                <>
                  {isFollowersOpen && (
                    <div className="popup">
                      <div className="popup-content">
                        <div
                          className="popup-head"
                          style={{ marginBottom: "10px" }}
                        >
                          <h2>Followers</h2>
                        </div>
                        <span className="close-icon" onClick={closePopup}>
                          &times;
                        </span>
                        {followers.length != 0
                          ? followers.map((element) => {
                              const { _id, userName, name, avatar } = element;
                              return (
                                <User
                                  key={_id}
                                  userId={_id}
                                  userName={userName}
                                  name={name}
                                  avatar={avatar.url}
                                />
                              );
                            })
                          : "Not followed anyone"}
                      </div>
                    </div>
                  )}

                  {isFollowingOpen && (
                    <div className="popup">
                      <div className="popup-content">
                        <div
                          className="popup-head"
                          style={{ marginBottom: "10px" }}
                        >
                          <h2>Following</h2>
                        </div>
                        <span className="close-icon" onClick={closePopup}>
                          &times;
                        </span>
                        {following.length != 0
                          ? following.map((element) => {
                              const { _id, userName, name, avatar } = element;
                              return (
                                <User
                                  key={_id}
                                  userId={_id}
                                  userName={userName}
                                  name={name}
                                  avatar={avatar.url}
                                />
                              );
                            })
                          : "Not followed anyone"}
                      </div>
                    </div>
                  )}
                </>
              );
            })
          : "Not Found"}
      </main>
    </>
  );
};

export default Users;
