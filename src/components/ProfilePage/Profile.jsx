import React, {useState} from "react";
import photo from "../../assets/profilepic.jpg";
import user2Img from '../../assets/user.png'
import "../ProfilePage/profile.scss";
import { useSelector, useDispatch } from "react-redux";
import User from "../User/User";
import { editUser } from "../../actions/User";

const Profile = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [isFollowersOpen, setFollowersOpen] = useState(false);
  const [isFollowingOpen, setFollowingOpen] = useState(false);
  const [isUpdateOpen, setUpdatedOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [about, setAbout] = useState('')
  const [dob, setDob] = useState('')
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState(null);
  
  const dispatch = useDispatch()

  const imageHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader()
 
    reader.readAsDataURL(file);
    reader.onloadend= () =>{
     setImage(file);
    }
 }
  const openUpdatePopup = () =>{
    setUpdatedOpen(true)
    setEditName(user.name)
    setAbout(user.description.about)
    setDob(user.description.dob)
    setLocation(user.description.location)
    setLink(user.description.link)
  }
  const updateUser = (e) =>{
    e.preventDefault()
   
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("about", about);
    formData.append("dob", dob);
    formData.append("location", location);
    formData.append("link", link);
      formData.append("file", image);


      dispatch(editUser(formData));
      setUpdatedOpen(false);
   
 
  }

  const openFollowersPopup = () => {
    setFollowersOpen(true);
  };

  const openFollowingPopup = () => {
    setFollowingOpen(true);
  };

  const closePopup = () => {
    setFollowersOpen(false);
    setFollowingOpen(false);
    setUpdatedOpen(false)
  };
  return (
    <>
      <div className="user_section profile_details">
        <div className="profile_box profile_photo">
          <div className="image">
            <img src={user.avatar.url} alt="" />
          </div>
        </div>
        {user ? (
 <div className="profile_box profile_content">
          <div className="content_box user_name">
         
            <span>{user.userName}</span>
            <button onClick={openUpdatePopup}>Edit Profile</button>
          </div>
          <div className="content_box followers_details_section">
            <div >
            <p>{user.posts.length} Posts</p>
            </div>
              <div onClick={openFollowersPopup}>
              <p>{user.followers.length} Followers</p>
              </div>
               <div onClick={openFollowingPopup}>

              <p>{user.following.length}  Following</p>
               </div>
        
          </div>
          <div className="content_box user_descripton">
            <h4>{user.name}</h4>
            {user.description ? (
              <>
               <p>{user.description.about}</p>
               <p>{user.description.dob}</p>
               <p>{user.description.location}</p>
               <a href={`${user.description.link}` } target='_blank'>{user.description.link}</a>
              </>
              
            ) : (
                  ""
            )}
          </div>
        </div>
        ):(
          <h2>Not found</h2>
        )}
       
      </div>
      {isUpdateOpen && (
              <div className="popup">
                <div className="popup-content">
                  <form onSubmit={updateUser}>
                    <div className="popup-head" style={{ marginBottom: "10px" }}>
                      <h2>Edit Profile</h2>
                    </div>
                    <span className="close-icon" onClick={closePopup}>
                      &times;
                    </span>
                    <div className="information">
                      <input
                        type="text"
                        placeholder="Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Bio"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                      <input
                        type="date"
                        placeholder="DOB"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                      <input
                        type="file"
                        onChange={imageHandler}
                      />
                    </div>
                    <button type="submit">Update Details</button>
                  </form>
                </div>
              </div>
            )}
      {isFollowersOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ "marginBottom": "10px" }}>
              <h2>Followers</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            {
            user.followers.length != 0 ? (
              user.followers.map((element)=>{
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
            ):(
               "Not followed anyone"
            )
           }
          </div>
        </div>
      )}

      {isFollowingOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ "marginBottom": "10px" }}>
              <h2>Following</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            {
            user.following.length != 0 ? (
              user.following.map((element)=>{
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
            ):(
               "Not followed anyone"
            )
           }
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
