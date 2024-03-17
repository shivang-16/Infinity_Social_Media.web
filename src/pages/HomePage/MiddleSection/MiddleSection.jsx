import { useState } from "react";
import "./middlesection.scss";
import PostBody from "../../../components/Posts/PostBody";
import { getAllPost } from "../../../redux/actions/Post";
import { getFollowingPost } from "../../../redux/actions/Post";
import Spinner2 from "../../../components/Spinner/Spinner2";
import { useDispatch, useSelector } from "react-redux";
import brandImg from "../../../assets/brand-logo.png";

const MiddleSection = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const [allPosts, setAllPosts] = useState(true);
  const [followingPosts, setFollowingPosts] = useState(false);
  const dispatch = useDispatch();
  const { post, loading: postLoading } = useSelector((state) => state.post);
  const { posts, loading: followingpostsLoading } = useSelector(
    (state) => state.followingPosts,
  );

  const handleAllPosts = () => {
    setAllPosts(true);
    setFollowingPosts(false);
    dispatch(getAllPost());
  };
  const handleFollowingPosts = () => {
    setFollowingPosts(true);
    setAllPosts(false);
    dispatch(getFollowingPost());
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="middle-header">
        <h2 className="home">Home</h2>
        <img src={brandImg} className="brandLogo brandlogo-middle" />
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
      {postLoading ? (
        <Spinner2 />
      ) : (
        allPosts && (
          <div className="middle-content">
            {post
              ? post
                  .slice()
                  .reverse()
                  .map((element) => {
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
              : "No post found"}
          </div>
        )
      )}
      {followingpostsLoading ? (
        <Spinner2 />
      ) : (
        followingPosts && (
          <div className="middle-content">
            {posts
              ? [...posts].reverse().map((element) => {
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
              : "No post found"}
          </div>
        )
      )}
    </>
  );
};

export default MiddleSection;
