/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../components/Posts/post.scss";
import { Link, useNavigate } from "react-router-dom";
import unlike from "../../assets/unlike.png";
import liked from "../../assets/liked.png";
import commentsImg from "../../assets/comment.png";
import bookmark from "../../assets/bookmark.png";
import bookmarked from "../../assets/bookmarksolid.png";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../../redux/actions/Post";
import { commentPost } from "../../redux/actions/Post";
import { bookmarkPost } from "../../redux/actions/Post";
import { getPostById } from "../../redux/actions/Post";
import { deletePost } from "../../redux/actions/Post";
import { editPost } from "../../redux/actions/Post";
import { getAllPost } from "../../redux/actions/Post";
import { loadUser } from "../../redux/actions/User";
import User from "../User/User";
import user2Img from "../../assets/user.png";
import { setProgress } from "../../redux/reducers/LoadingBar";
import Linkify from 'react-linkify';

//get caption , id(postId), likes , owner from props
const PostBody = ({
  caption,
  postId,
  likes,
  owner,
  comments,
  image,
  createdAt,
}) => {
  const { user } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.postById);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isLikeopen, setIsLikeOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const calculateTimestamp = (createdDate) => {
    const currentDate = new Date();
    const postDate = new Date(createdDate);
    const timeDifferenceInSeconds = Math.floor((currentDate - postDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${
        timeDifferenceInSeconds > 1 ? "s" : ""
      } ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else {
      const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    if (post) {
      const createdDate = createdAt;
      const calculatedTimestamp = calculateTimestamp(createdDate);
      setTimestamp(calculatedTimestamp);
    }
  }, []);

  const handlePostById = () => {
    dispatch(getPostById(postId));
  };

  let postIsLiked, postIsBookmarked;
  const [isLiked, setIsLiked] = useState(postIsLiked);
  const [likesCount, setLikesCount] = useState(likes.length);
  const handleLikeClick = async () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    await dispatch(likePost(postId));
  };

  const [isBookmark, setIsBookmark] = useState(postIsBookmarked);
  const handleBookmarkClick = async () => {
    setIsBookmark((prev) => !prev);
    await dispatch(bookmarkPost(postId));
    dispatch(loadUser());
  };

  useEffect(() => {
    postIsLiked = likes.some((like) => like._id === user._id);
    setIsLiked(postIsLiked);

    postIsBookmarked = user.bookmarks.some(
      (bookmark) => bookmark._id === postId
    );
    setIsBookmark(postIsBookmarked);
  }, []);

  const toggleCommentBox = () => {
    setIsCommentOpen((prevState) => !prevState);
  };

  const handleComment = async () => {
    await dispatch(commentPost({ postId, comment }));
    await dispatch(getPostById(postId));
    navigate(`/post/${postId}`);
    setIsCommentOpen((prevState) => !prevState);
  };

  const handleDelete = async () => {
    dispatch(setProgress(10));
    await dispatch(deletePost(postId));
    dispatch(getAllPost());
    dispatch(setProgress(100));
  };

  const handleEditPopup = () => {
    setIsEditOpen(true);
    setEditCaption(caption);
  };

  const handleEdit = async () => {
    setEditCaption(editCaption);
    dispatch(setProgress(10));
    await dispatch(editPost({ postId, caption: editCaption }));
    dispatch(getAllPost());
    setIsEditOpen(false);
    setIsOptionsOpen((prevState) => !prevState);
    dispatch(setProgress(100));
  };

  const toggleOptions = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };
  const showOptionIcon = user?._id === owner?._id;

  const openLikesPopup = () => {
    setIsLikeOpen(true);
  };

  const closePopup = () => {
    setIsLikeOpen(false);
    setIsEditOpen(false);
  };



// Example usage
<Linkify>See examples at tasti.github.io/react-linkify/.</Linkify>

  return (
    <>
      <div className="post" key={postId}>
        <div className="post-header">
          <User
            userId={owner?._id}
            userName={owner?.userName}
            name={owner?.name}
            avatar={owner?.avatar?.url}
          />

          {showOptionIcon ? (
            <>
              <div className="options-icon" onClick={toggleOptions}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              {isOptionsOpen && (
                <div className="options">
                  <div onClick={handleEditPopup}>Edit</div>
                  <div onClick={handleDelete}>Delete</div>
                </div>
              )}
            </>
          ) : null}
          {isEditOpen && (
            <div className="popup">
              <div className="popup-content">
                <div className="popup-head">
                  <img src={user2Img} alt="" />
                  <h2>Edit Post</h2>
                </div>
                <span className="close-icon" onClick={closePopup}>
                  &times;
                </span>
                <textarea
                  placeholder="Write your caption here"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  required
                />
                <div className="popup-foot">
                  <button onClick={handleEdit}>Update</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div onClick={handlePostById}>
          <div className="post-description">
            <div className="caption">
              <Linkify>{caption}</Linkify>
              <div className="read-more">
              <Link to={`/post/${postId}`}>See More</Link>
              </div>
            </div>
            {image ? (
              <div className="image">
                <img src={image} alt="" />
              </div>
            ) : (
              ""
            )}
          </div>
         
        </div>
        <div className="post-footer">
          <div>
            <button className="like action" onClick={handleLikeClick}>
              <img src={isLiked ? liked : unlike} alt="" />
            </button>
            <span>{likesCount}</span>
          </div>
          <div>
            <button className="comment action" onClick={toggleCommentBox}>
              <img src={commentsImg} alt="" />
            </button>
            <span>{comments.length}</span>
          </div>
          <div>
            <button className="bookmark action" onClick={handleBookmarkClick}>
              <img src={isBookmark ? bookmarked : bookmark} alt="" />
            </button>
          </div>
        </div>
        <div className="mini-footer">
          {likes.length !== 0 ? (
            <span className="likes-footer" onClick={openLikesPopup}>
              {likes[0].userName === user.userName ? "You" : likes[0].userName}{" "}
              {likes.length > 1
                ? `and ${likes.length - 1} others liked the post`
                : "liked the post"}
            </span>
          ) : (
            <span className="likes-footer">No likes yet</span>
          )}
          <div className="timestamp">{timestamp}</div>
        </div>
      </div>
      <div className={`post-comments ${isCommentOpen ? "open" : ""}`}>
        <span>
          replying to{" "}
          <span className="reply-user name">
            <p>{owner?.userName}</p>
          </span>
        </span>
        <div className="post-comment">
          <textarea
            placeholder="Post your reply"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button onClick={handleComment}>Reply</button>
        </div>
      </div>
      {isLikeopen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ marginBottom: "10px" }}>
              <h2>Likes</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            {likes.length != 0
              ? likes.map((element) => {
                  const { _id, userName, name, avatar } = element;
                  return (
                    <User
                      key={_id}
                      userId={_id}
                      userName={userName}
                      name={name}
                      avatar={avatar?.url}
                    />
                  );
                })
              : "No likes yet"}
          </div>
        </div>
      )}
    </>
  );
};

export default PostBody;
