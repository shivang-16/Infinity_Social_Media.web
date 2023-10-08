import Mainbody from "./components/HomePage/Mainbody/Mainbody";
import Connect from "./components/Connect/Connect";
import PostSection from "./components/ProfilePage/PostSection";
import BookmarkSection from "./components/ProfilePage/BookmarkSection";
import Login from "./components/Login/login";
import SingUp from "./components/SignUp/SingUp";
import Verification from "./components/Otp/Verification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Mainbody />} />
        <Route exact path="/connect" element={<Connect />} />
        <Route exact path="/profile" element={<PostSection />} />
        <Route exact path="/bookmark" element={<BookmarkSection />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SingUp />} />
        <Route exact path="/verify" element={<Verification />}/>
      </Routes>
    </Router>
  );
}

export default App;
