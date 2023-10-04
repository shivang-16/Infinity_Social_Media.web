import React from 'react'
import LeftSidebar from '../LeftSideBar/LeftSidebar'
import MiddleSection from '../MiddleSection/MiddleSection'
import RightSidebar from '../RightSideBar/RightSidebar'
import 'mainbody.scss'

const Mainbody = () => {
  return (
   <main>
      <div className="main-box left_sidebar">
      <LeftSidebar/>
      </div>
      <div className="main-box middle_section">
        <MiddleSection/>
      </div>
      <div className="main-box right_sidebar">
        <RightSidebar/>
      </div>
   </main>
  )
}

export default Mainbody