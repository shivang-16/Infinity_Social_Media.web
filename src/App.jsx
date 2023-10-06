import Mainbody from "./components/HomePage/Mainbody/Mainbody";
import Connect from "./components/Connect/Connect";
import Profile from "./components/ProfilePage/profile";
import PostSection from "./components/ProfilePage/PostSection";
import BookmarkSection from "./components/ProfilePage/BookmarkSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Mainbody />} />
        <Route exact path="/connect" element={<Connect />} />
        <Route exact path="/profile" element={<PostSection />} />
        <Route exact path="/bookmark" element={<BookmarkSection />} />
      </Routes>
    </Router>
  );
}

export default App;
