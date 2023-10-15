import { useEffect } from "react";
import Mainbody from "./components/HomePage/Mainbody/Mainbody";
import Connect from "./components/Connect/Connect";
import PostSection from "./components/ProfilePage/PostSection";
import BookmarkSection from "./components/ProfilePage/BookmarkSection";
import Login from "./components/Login/login";
import SingUp from "./components/SignUp/SingUp";
import Verification from "./components/Otp/Verification";
import Users from "./components/UserProfile/UserProfile";
import { loadUser } from "./actions/User";
import { getAllPost } from "./actions/Post";
import { getAllUser } from "./actions/User";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import "./App.scss";

function App() {
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
        dispatch(getAllPost())
        dispatch(getAllUser())
       }, [dispatch]);
    
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={isAuthenticated ? <Mainbody />: <Login />} />
        <Route exact path="/connect" element={isAuthenticated ? <Connect /> : <Login />} />
        <Route exact path="/profile" element={isAuthenticated ? <PostSection /> : <Login />} />
        <Route exact path="/bookmark" element={isAuthenticated ? <BookmarkSection /> : <Login />} />
        <Route exact path="/signup" element={isAuthenticated ? <SingUp /> : <Login />} />
        <Route exact path="/verify" element={isAuthenticated ? <Verification /> : <Login />}/>
        <Route exact path="/user/:userName" element={isAuthenticated ? <Users /> : <Login />}/>
       
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
