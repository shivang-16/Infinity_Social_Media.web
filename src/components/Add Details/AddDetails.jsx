import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../redux/actions/User";
import "./details.scss";

const AddDetails = () => {
  const { user } = useSelector((state) => state.user);

  const [about, setAbout] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("about", about);
    formData.append("dob", dob);
    formData.append("location", location);
    formData.append("link", link);
    formData.append("file", image);

    await dispatch(editUser(formData));
    navigate("/");
  };

  return (
    <main id="login_page">
      <div className="login_form details_form">
        <form onSubmit={updateUser}>
          <div className="popup-head" style={{ marginBottom: "10px" }}>
            <h2>Add Details</h2>
          </div>

          <div className="information">
            <div className="image-profile">
              <img
                src={imagePreview ? imagePreview : user?.avatar?.url}
                alt=""
              />
              <div>
                <label className="custom-file-input">
                  <span style={{ background: "none" }}>Choose photo</span>
                  <input type="file" onChange={imageHandler} />
                </label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImagePreview(null);
                  }}
                >
                  Remove photo
                </button>
              </div>
            </div>
            {/* <input
                type="text"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              /> */}
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

            <div>
              <button type="submit">Add</button>
              <button onClick={(e) => e.preventDefault()}>
                <Link to="/">Add later</Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddDetails;
