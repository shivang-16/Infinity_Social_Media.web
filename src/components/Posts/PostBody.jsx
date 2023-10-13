import React, { useState } from 'react';
import '../../components/Posts/post.scss';
import photo from '../../assets/user3.jpg';
import photo2 from '../../assets/user2.jpg';
import unlike from '../../assets/unlike.png';
import liked from '../../assets/liked.png';
import comment from '../../assets/comment.png';
import bookmark from '../../assets/bookmark.png';
import bookmarked from '../../assets/bookmarksolid.png';
import { useSelector } from 'react-redux';

const PostBody = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { post, loading: postLoading } = useSelector((state) => state.post);

  const [isLiked, setIsLiked] = useState(false); // State for like button
  const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark button

  // Function to handle like button click
  const handleLikeClick = () => {
    setIsLiked((prevState) => !prevState); // Toggle the like button state
  };

  // Function to handle bookmark button click
  const handleBookmarkClick = () => {
    setIsBookmarked((prevState) => !prevState); // Toggle the bookmark button state
  };

  return (
    <>
    {user && post ? (
      post.map((element, index)=>{
        const {caption, image} = element
        return (
          <div className="post" key={index}>
          <div className="post-header">
            <div className="user-photo">
              <img src={photo2} alt="" />
            </div>
            <div className="username">
              <h4>{user.name}</h4> <span>@{user.userName}</span>
            </div>
          </div>
          <div className="post-description">
            <div className="caption">
              <p>
                {caption}
              </p>
            </div>
            <div className="image">
              <img src={photo} alt="" />
            </div>
          </div>
          <div className="post-footer">
            <button className="like action" onClick={handleLikeClick}>
              <img src={isLiked ? liked : unlike} alt="" />
            </button>
            <button className="comment action">
              <img src={comment} alt="" />
            </button>
            <button className="bookmark action" onClick={handleBookmarkClick}>
              <img src={isBookmarked ? bookmarked : bookmark} alt="" />
            </button>
          </div>
        </div>
        )
      })
    ):("Not found")}
      
    </>
  );
};

export default PostBody;
