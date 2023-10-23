import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Mainbody from "./components/HomePage/Mainbody/Mainbody";
import Connect from "./components/Connect/Connect";
import PostSection from "./components/ProfilePage/PostSection";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Change Password/ForgotPassword";
import ChangePassword from "./components/Change Password/ChangePassword";
import SingUp from "./components/SignUp/SingUp";
import Verification from "./components/Otp/Verification";
import AddDetails from "./components/Add Details/AddDetails";
import Users from "./components/UserProfile/UserProfile";
import Comment from "./components/Comment/Comment";
import { loadUser } from "./actions/User";
import { getAllPost } from "./actions/Post";
import { getAllUser } from "./actions/User";
import { getMyPost } from "./actions/Post";
import { getFollowingPost } from "./actions/Post";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./styles/popup.scss";
import "./App.scss";

function App() {
  const { isAuthenticated, isRedirect } = useSelector((state) => state.user);
  const loadingProgress = useSelector((state) => state.loadingBar.progress);

  const [progress, setLocalProgress] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllUser({}));
    dispatch(getAllPost());
    dispatch(getMyPost());
    dispatch(getFollowingPost());

    if (progress !== loadingProgress) {
      setLocalProgress(loadingProgress);
    }
  }, [dispatch, loadingProgress]);

  useEffect(() => {}, []);

  return (
    <Router>
      <LoadingBar
        color="orangered"
        progress={progress}
        onLoaderFinished={() => setLocalProgress(0)}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Mainbody /> : <Login />}
        />
        <Route
          exact
          path="/connect"
          element={isAuthenticated ? <Connect /> : <Login />}
        />
        <Route
          exact
          path="/profile"
          element={isAuthenticated ? <PostSection /> : <Login />}
        />
        <Route
          exact
          path="/user/:userName"
          element={isAuthenticated ? <Users /> : <Login />}
        />
        <Route
          exact
          path="/post/:id"
          element={isAuthenticated ? <Comment /> : <Login />}
        />
        <Route exact path="/signup" element={<SingUp />} />
        <Route
          exact
          path="/verify"
          element={isRedirect ? <Verification /> : <SingUp />}
        />
        <Route
          exact
          path="/details"
          element={isAuthenticated ? <AddDetails /> : <Verification />}
        />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/changePassword" element={<ChangePassword />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              backgroundColor: "black",
              color: "white",
              border: "1px solid green",
              padding: "15px",
              marginRight: "20px",
            },
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            style: {
              backgroundColor: "black",
              color: "red",
              border: "1px solid red",
              padding: "15px",
              marginRight: "20px",
            },
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
