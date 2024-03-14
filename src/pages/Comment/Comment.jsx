import React, { useState } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import { useSelector } from "react-redux";
import PostBody from "../../components/Posts/PostBody";
import user2Img from "../../assets/user.png";
import Spinner2 from "../../components/Spinner/Spinner2";
import "./comment.scss";
import User from "../../components/User/User";

const Comment = () => {
  const { post, loading: PostLoading } = useSelector((state) => state.postById);

  return (
    <>
      <div className="comment-main-section">
        <div className="middle-header middle-header-media-query">
          <h2>Home</h2>
        </div>
        <div className="main-box left_sidebar">
          <LeftSidebar />
        </div>
        <div className="comment-section">
          <div className="comment-content">
            {post ? (
              <PostBody
                key={post._id}
                caption={post?.caption}
                postId={post._id}
                likes={post.likes}
                owner={post?.owner}
                comments={post?.comments}
                image={post?.image?.url}
                createdAt={post.createdAt}
              />
            ) : (
              <Spinner2 />
            )}

            <div className="display-comments">
              {post && post.comments.length != 0
                ? post.comments.map((element, index) => {
                    const { comment, user } = element;
                    return (
                      <div key={index} className="comment_box">
                        <User
                          userId={user._id}
                          name={user.name}
                          userName={user.userName}
                          avatar={user?.avatar?.url}
                        />
                        <p>{comment}</p>
                      </div>
                    );
                  })
                : "No Comments"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
