import React, { useState } from "react";
import Profile from "./profile";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import "../ProfilePage/profile.scss";
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
import PostBody from "../Posts/PostBody";
import { useSelector } from "react-redux";

const PostSection = () => {
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.myposts);
  const [isPostSection, setIsPostSection] = useState(true);
  const [isBookmarkSection, setIsBookmarkSection] = useState(false);

  const openBookmarkSection = async () => {
    setIsPostSection(false);
    setIsBookmarkSection(true);
  };
  const openPostsSection = async () => {
    setIsPostSection(true);
    setIsBookmarkSection(false);
  };

  return (
    <>
      <main>
        <div className="main-box left_sidebar">
          <LeftSidebar />
        </div>
        <div className="main-box middle-section">
          <div className="user_details">
            <Profile />
            <div className="user_section post_details">
              <div className="post_details_header">
                <div
                  className={`posts detail_box ${
                    isPostSection ? "active_class" : ""
                  }`}
                  onClick={openPostsSection}
                >
                  <img src={post} alt="" />
                  <span>Posts</span>
                </div>

                <div
                  className={`bookmark detail_box ${
                    isBookmarkSection ? "active_class" : ""
                  }`}
                  onClick={openBookmarkSection}
                >
                  <img src={bookmark} alt="" />
                  <span>Bookmark</span>
                </div>
              </div>
              <div className="post_detail_content">
                {isPostSection && posts
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
                          image={image?.url}
                        />
                      );
                    })
                  : "No post found"}
                {isBookmarkSection && user
                  ? user.bookmarks.map((element) => {
                      const { caption, _id, likes, owner, comments, image } =
                        element;
                      return <></>;
                    })
                  : "No Bookmark found"}
              </div>
            </div>
          </div>

          <div className="box right_sidebar">
            <RightSidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default PostSection;
