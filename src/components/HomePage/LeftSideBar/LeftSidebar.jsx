import React from 'react'
import './leftsidebar.scss'
import { Link } from 'react-router-dom'
import home from '../../../assets/home.png'
import search from '../../../assets/search.png'
import user from '../../../assets/user.png'
import create from '../../../assets/create.png'

const LeftSidebar = () => {
  return (
    <>
        <div className="leftSidebar-header">
             <h2>SocialApp</h2>
        </div>
        <div className="leftSidebar-content">
          <Link to='/'>
          <div className="left-boxes">
              <img src={home} />
              <p>Home</p>
              </div>
          </Link>
           
            <div className="left-boxes">
              <img src={search} />
              <p>Search</p>
              </div>
              <Link to = '/connect'>
              <div className="left-boxes">
              <img src={user} />
              <p>Connect</p></div>
              </Link>
            <div className="left-boxes">
              <img src={create} />
              <p>Create</p></div>
              <Link to = '/profile'>
            <div className="left-boxes">
              <img src={user} />
              <p>Profile</p></div>
              </Link>
        </div>
   
    </>
  )
}

export default LeftSidebar