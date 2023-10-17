import React, { useState, useEffect } from 'react';
import '../../components/Posts/post.scss';
import { Link } from 'react-router-dom';
import unlike from '../../assets/unlike.png';
import liked from '../../assets/liked.png';
import commentsImg from '../../assets/comment.png';
import bookmark from '../../assets/bookmark.png';
import bookmarked from '../../assets/bookmarksolid.png';
import { useSelector, useDispatch } from 'react-redux';
import { likePost } from '../../actions/Post';
import { commentPost } from '../../actions/Post';
import { getPostById } from '../../actions/Post';
import { deletePost } from '../../actions/Post';
import { editPost } from '../../actions/Post';
import User from '../User/User';
import user2Img from '../../assets/user.png'

//get caption , id(postId), likes , owner from props
const PostBody = ({caption, postId, likes, owner, comments}) => {
  const [comment, setComment] = useState('')
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 
 const [isBookmarked, setIsBookmarked] = useState(false);
 const [isCommentOpen, setIsCommentOpen] = useState(false);
 const [isLikeopen, setIsLikeOpen] = useState(false);
 const [isOptionsOpen, setIsOptionsOpen] = useState(false);
 const [isEditOpen, setIsEditOpen] = useState(false)
 const [editCaption, setEditCaption] = useState('')
   
   const handlePostById = ()=>{
    dispatch(getPostById(postId))
   }

  const handleLikeClick = () => {
    dispatch(likePost(postId));
  }
  const postIsLiked = likes.some(like => like._id === user._id);

  const handleComment = ()=>{
    dispatch(commentPost({postId, comment}))
  }

  const handleDelete = ()=>{
    console.log('deleted')
    dispatch(deletePost(postId))
  }
 
  const handleEditPopup = () =>{
    setIsEditOpen(true)
    setEditCaption(caption);
  }
   
  const handleEdit = ()=>{
     setEditCaption(editCaption)
     dispatch(editPost({postId, caption: editCaption}))
     setIsEditOpen(false)
  }
  const handleBookmarkClick = (postId) => {
    setIsBookmarked((prevState) => !prevState); 
  };
  

  const toggleCommentBox = () => {
    setIsCommentOpen((prevState) => !prevState);
  };


  const toggleOptions = () =>{
    setIsOptionsOpen((prevState) => !prevState)
  }
  const showOptionIcon = user?._id === owner?._id


  const openLikesPopup = () => {
    setIsLikeOpen(true);
    
  };

  const closePopup = () => {
    setIsLikeOpen(false);
    setIsEditOpen(false)
  };
  return (
   
         <>
       
        
              <div className="post" key={postId}>
               
                <div className="post-header">
                <User 
               userId={owner?._id} 
               userName={owner?.userName} 
               name={owner?.name}
               avatar = {user2Img}
               />
            {showOptionIcon ? (
              <>
                <div className='options-icon' onClick={toggleOptions}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {isOptionsOpen && (
                  <div className='options'>
                    <div onClick={handleEditPopup}>Edit</div>
                    <div onClick={handleDelete}>Delete</div>
                  </div>
                )}
                </>
                ) : null}
               {isEditOpen && ( <div className="popup">
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
              onChange={e=>setEditCaption(e.target.value)}
              required
            />
            <div className="popup-foot">
           <button onClick={handleEdit}>Update</button>
            
            </div>
          </div>
        </div> )}
                </div>
                <Link to={`/post/${postId}`} onClick={handlePostById}>
                <div className="post-description">
                  <div className="caption">
                    <p>{caption}</p>
                  </div>
                  <div className="image">
                 {/* <img src='https://www.apple.com/v/ios/photos/g/images/meta/ios-photos__1eiprmm69sym_og.png' alt="" /> */}
                  </div>
                </div>
                </Link>
                <div className="post-footer">
                  <div>
  
                   <button className="like action" onClick={handleLikeClick}>
                    <img src={postIsLiked ? liked : unlike} alt="" />
                   
                  </button>
                  <span onClick={openLikesPopup}>{likes.length}</span>
                  </div>
                  <div>
                  <button className="comment action" onClick={toggleCommentBox}>
                    <img src={commentsImg} alt="" />
                  </button>
                  <span>{comments.length}</span>
                  </div>
                <div>
                <button className="bookmark action" onClick={handleBookmarkClick}>
                    <img src={isBookmarked ? bookmarked : bookmark} alt="" />
                  </button>
                </div>
                  
                </div>
              </div>
       <div className={`post-comments ${isCommentOpen ? 'open' : ''}`}>
        <span>replying to <span className='reply-user'><User 
               userId={owner?._id} 
               userName={owner?.userName} 
               /></span></span>
        <div className='post-comment'>
        <textarea
          placeholder="Post your reply"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button onClick={handleComment}>Reply</button>
        </div>
      </div>
      {isLikeopen && (<div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ "marginBottom": "10px" }}>
              <h2>Likes</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            {likes.length != 0 ? (
                likes.map((element)=>{
                  const {_id, userName, name} = element
                return(
                  <User 
                  key={_id}
                  userId={_id} 
                  userName={userName} 
                  name={name}
                  avatar={user2Img}
               />
                )
                })
            ) : (
              "No likes yet"
              )}
            </div>
            </div>)}
       </>
  );
};

export default PostBody;