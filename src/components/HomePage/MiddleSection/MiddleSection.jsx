import React, { useState } from "react";
import "./middlesection.scss";
import PostBody from "../../Posts/PostBody";
import { getAllPost } from "../../../actions/Post";
import { getFollowingPost } from "../../../actions/Post";
import Spinner from "../../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";

const MiddleSection = () => {
  
  const [activeTab, setActiveTab] = useState("Explore");
  const [allPosts , setAllPosts] = useState(true)
  const [followingPosts, setFollowingPosts] = useState(false)
  const dispatch = useDispatch()
  const { post, loading: postLoading } = useSelector((state) => state.post);
  const { posts, loading: postsLoading } = useSelector((state) => state.followingPosts);
  
  
  const handleAllPosts =()=>{
    setAllPosts(true)
    setFollowingPosts(false)
      dispatch(getAllPost())
  }
  const handleFollowingPosts = () =>{
      setFollowingPosts(true)
      setAllPosts(false)
      dispatch(getFollowingPost())
  }
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

 

  return (
    <>
      <div className="middle-header">
        <h2>Home</h2>
        <div className="mid-header-section">
          <div onClick={handleAllPosts}>
            <h3 
              className={activeTab === "Explore" ? "active" : ""}
              onClick={() => handleTabClick("Explore")}
            >
              Explore
            </h3>
          </div>
          <div onClick={handleFollowingPosts}>
            <h3
              className={activeTab === "Following" ? "active" : ""}
              onClick={() => handleTabClick("Following")}
            >
              Following
            </h3>
          </div>
        </div>
      </div>
      {allPosts && <div className="middle-content">
        {post ? (
          post.map((element)=>{
            const {caption, _id, likes, owner, comments, image } = element 
            return (
            <PostBody
              key={_id}
              caption={caption}
              postId = {_id}
              likes ={likes}
              owner = {owner}
              comments= {comments}
              image = {image.url}
            />
            )
          })
        ):(
          "No post found"
        )}
       
      </div>}
      {followingPosts && <div className="middle-content">
        {posts ? (
          posts.map((element)=>{
            const {caption, _id, likes, owner, comments } = element 
            return (
            <PostBody
              key={_id}
              caption={caption}
              postId = {_id}
              likes ={likes}
              owner = {owner}
              comments= {comments}
            />
            )
          })
        ):(
          "No post found"
        )}
       
      </div>}
    </>
  );
};

export default MiddleSection;
