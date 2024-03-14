import { useState } from "react";
import linkIcon from "../../assets/link.png";
import locationIcon from "../../assets/location.png";
import dateIcon from "../../assets/date.png";
import bioIcon from "../../assets/bio.png";
import defaultProfile from "../../assets/user.png";
import "../ProfilePage/profile.scss";
import { useSelector, useDispatch } from "react-redux";
import User from "../../components/User/User";
import { editUser } from "../../redux/actions/User";
import { deleteAvatar } from "../../redux/actions/User";
import { loadUser } from "../../redux/actions/User";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [isFollowersOpen, setFollowersOpen] = useState(false);
  const [isFollowingOpen, setFollowingOpen] = useState(false);
  const [isUpdateOpen, setUpdatedOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [about, setAbout] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const openUpdatePopup = () => {
    setUpdatedOpen(true);
    setEditName(user.name);
    setAbout(user.description.about);
    setDob(user.description.dob);
    setLocation(user.description.location);
    setLink(user.description.link);
  };
  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("about", about);
    formData.append("dob", dob);
    formData.append("location", location);
    formData.append("link", link);
    formData.append("file", image);

    await dispatch(editUser(formData));
    dispatch(loadUser());
    setUpdatedOpen(false);
  };

  const handleDeleteAvatar = async (e) => {
    e.preventDefault();
    await dispatch(deleteAvatar());
    setImagePreview(null);
  };

  const openFollowersPopup = () => {
    setFollowersOpen(true);
  };

  const openFollowingPopup = () => {
    setFollowingOpen(true);
  };

  const closePopup = () => {
    setFollowersOpen(false);
    setFollowingOpen(false);
    setUpdatedOpen(false);
    setImagePreview("");
  };
  return (
    <>
      <div className="user_section profile_details">
        <div className="profile_box profile_photo">
          <div className="image-profile">
            <img
              src={user.avatar?.url ? user.avatar?.url : defaultProfile}
              alt=""
            />
          </div>
        </div>
        {user ? (
          <div className="profile_box profile_content">
            <div className="content_box user_name">
              <span>{user.userName}</span>
              <button onClick={openUpdatePopup}>Edit Profile</button>
            </div>
            <div className="content_box followers_details_section">
              <div>
                <p>{user.posts.length} Posts</p>
              </div>
              <div onClick={openFollowersPopup}>
                <p>{user.followers.length} Followers</p>
              </div>
              <div onClick={openFollowingPopup}>
                <p>{user.following.length} Following</p>
              </div>
            </div>
            <div className="content_box user_descripton">
              <h4>{user.name}</h4>
              {user.description ? (
                <>
                  {user.description.about ? (
                    <p>
                      <img src={bioIcon} alt="" />
                      {user.description.about}
                    </p>
                  ) : (
                    ""
                  )}
                  {user.description.dob ? (
                    <p>
                      <img src={dateIcon} alt="" />
                      {user.description.dob}
                    </p>
                  ) : (
                    ""
                  )}
                  {user.description.location ? (
                    <p>
                      <img src={locationIcon} alt="" />
                      {user.description.location}
                    </p>
                  ) : (
                    ""
                  )}
                  {user.description.link ? (
                    <p>
                      <img src={linkIcon} alt="" />
                      <a
                        href={
                          user.description.link.startsWith("http")
                            ? user.description.link
                            : `https://${user.description.link}`
                        }
                        target="_blank"
                      >
                        {user.description.link}
                      </a>
                    </p>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
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
                <div className="image-profile">
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : user?.avatar?.url || defaultProfile
                    }
                    alt=""
                  />
                  <div>
                    <label className="custom-file-input">
                      <span>Choose photo</span>
                      <input type="file" onChange={imageHandler} />
                    </label>

                    <button onClick={handleDeleteAvatar}>Remove photo</button>
                  </div>
                </div>
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
                  type="text"
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

                <div>
                  <button type="submit">Update</button>
                  <button onClick={closePopup}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {isFollowersOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ marginBottom: "10px" }}>
              <h2>Followers</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            {user.followers.length != 0
              ? user.followers.map((element) => {
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
              : "Not followed anyone"}
          </div>
        </div>
      )}

      {isFollowingOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head" style={{ marginBottom: "10px" }}>
              <h2>Following</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            {user.following.length != 0
              ? user.following.map((element) => {
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
              : "Not followed anyone"}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
