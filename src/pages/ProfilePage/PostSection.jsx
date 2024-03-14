/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Profile from "./Profile";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import "../ProfilePage/profile.scss";
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
import PostBody from "../../components/Posts/PostBody";
import { useSelector, useDispatch } from "react-redux";
import Spinner3 from "../../components/Spinner/Spinner3";
import { getMyBookmark } from "../../redux/actions/Post";
import { getMyPost } from "../../redux/actions/Post";

const PostSection = () => {
  const { user } = useSelector((state) => state.user);
  const { posts, loading: myPostLoading } = useSelector(
    (state) => state.myposts,
  );
  const [isPostSection, setIsPostSection] = useState(true);
  const [isBookmarkSection, setIsBookmarkSection] = useState(false);
  const dispatch = useDispatch();

  const openBookmarkSection = async () => {
    setIsPostSection(false);
    setIsBookmarkSection(true);
    dispatch(getMyBookmark());
  };
  const openPostsSection = async () => {
    setIsPostSection(true);
    setIsBookmarkSection(false);
    dispatch(getMyPost());
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

              <div className="myposts-bookmark-section">
                {myPostLoading ? (
                  <Spinner3 />
                ) : (
                  <div className="post_detail_content">
                    {isPostSection && posts && posts.length > 0
                      ? posts.map((element) => {
                          const {
                            caption,
                            _id,
                            likes,
                            owner,
                            comments,
                            image,
                            createdAt,
                          } = element;
                          return (
                            <PostBody
                              key={_id}
                              caption={caption}
                              postId={_id}
                              likes={likes}
                              owner={owner}
                              comments={comments}
                              image={image?.url}
                              createdAt={createdAt}
                            />
                          );
                        })
                      : isPostSection && posts && posts.length === 0
                      ? "No posts found"
                      : ""}
                    {isBookmarkSection && posts && posts.length > 0
                      ? posts.map((element) => {
                          const {
                            caption,
                            _id,
                            likes,
                            owner,
                            comments,
                            image,
                            createdAt,
                          } = element;
                          return (
                            <PostBody
                              key={_id}
                              caption={caption}
                              postId={_id}
                              likes={likes}
                              owner={owner}
                              comments={comments}
                              image={image?.url}
                              createdAt={createdAt}
                            />
                          );
                        })
                      : isBookmarkSection && posts && posts.length === 0
                      ? "No bookmarks found"
                      : ""}
                  </div>
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
  );
};

export default PostSection;
