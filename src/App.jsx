import Mainbody from './components/HomePage/Mainbody/Mainbody'
import Connect from './components/Connect/Connect'
import Profile from './components/ProfilePage/profile'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.scss'

function App() {

  return (
    <Router>
    <Routes>
    <Route exact path ='/' element={<Mainbody/>}/>
    <Route exact path ='/connect' element={<Connect/>}/>
    <Route exact path ='/profile' element={<Profile/>}/>
    </Routes> 
    </Router>
  )
}

export default App
