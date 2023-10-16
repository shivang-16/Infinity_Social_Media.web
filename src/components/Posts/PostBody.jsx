import React, { useState } from 'react';
import '../../components/Posts/post.scss';
import photo from '../../assets/user3.jpg';
import photo2 from '../../assets/user.png';
import unlike from '../../assets/unlike.png';
import liked from '../../assets/liked.png';
import comment from '../../assets/comment.png';
import bookmark from '../../assets/bookmark.png';
import bookmarked from '../../assets/bookmarksolid.png';
import { useSelector, useDispatch } from 'react-redux';
import { likePost } from '../../actions/Post';
const PostBody = ({caption, _id, likes, owner}) => {
  
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 

  const [isBookmarked, setIsBookmarked] = useState(false);


  const handleLikeClick = (_id) => {
    dispatch(likePost(_id));
  }
  const postIsLiked = likes.some(like => like._id === user._id);

  const handleBookmarkClick = (_id) => {
    setIsBookmarked((prevState) => !prevState); 
  };
  

  return (
    <>
         
              <div className="post" key={_id}>
                <div className="post-header">
                  <div className="user-photo">
                    <img src={photo2} alt="" style={{"filter": "invert(100%)"}}/>
                  </div>
                  <div className="username">
                    <h4>{owner?.name}</h4> <span>@{owner?.userName}</span>
                  </div>
                </div>
                <div className="post-description">
                  <div className="caption">
                    <p>{caption}</p>
                  </div>
                  <div className="image">
                 {/* <img src='https://www.apple.com/v/ios/photos/g/images/meta/ios-photos__1eiprmm69sym_og.png' alt="" /> */}
                  </div>
                </div>
                <div className="post-footer">
                  <div>
  
                   <button className="like action" onClick={() => handleLikeClick(_id)}>
                    <img src={postIsLiked ? liked : unlike} alt="" />
                   
                  </button>
                  <span>{likes.length}</span>
                  </div>
                  <div>
                  <button className="comment action">
                    <img src={comment} alt="" />
                  </button>
                  </div>
                <div>
                <button className="bookmark action" onClick={()=>handleBookmarkClick(_id)}>
                    <img src={isBookmarked ? bookmarked : bookmark} alt="" />
                  </button>
                </div>
                  
                </div>
              </div>
         
       
    </>
  );
};

export default PostBody;