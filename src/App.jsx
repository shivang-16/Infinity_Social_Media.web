import Mainbody from './components/Mainbody'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.scss'

function App() {

  return (
    <Router>
    <Routes>
    <Route exact path ='/' element={<Mainbody/>}/>
    </Routes> 
    </Router>
  )
}

export default App
