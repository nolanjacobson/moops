import React from 'react'
import CategoryStyles from '../CSS/Categories.css'
import HamburgerMenu from '../pages/HamburgerMenu'
import profilePicture from '../images/githubProfile.PNG'
const Categories = () => {
  return (
    <>
      <span className="flexIcons">
        <HamburgerMenu />
        <img className="profilePicture" src={profilePicture} />
        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
      </span>
      <section className="categoriesFlex">
        {/* Match props to category name */}
        <div className="categoryName">Categories</div>
        <hr className="moopsGradient"></hr>
      </section>
      <section className="categoryOptions">
        <span class="far fa-laugh-beam">
          <span className="iconText">&nbsp;&nbsp;&nbsp;&nbsp;Funny</span>
        </span>
        <span class="far fa-laugh-beam">
          <span className="iconText">&nbsp;&nbsp;&nbsp;&nbsp;Funny</span>
        </span>
        <span class="far fa-laugh-beam">
          <span className="iconText">&nbsp;&nbsp;&nbsp;&nbsp;Funny</span>
        </span>
        <span class="far fa-laugh-beam">
          <span className="iconText">&nbsp;&nbsp;&nbsp;&nbsp;Funny</span>
        </span>
        <span class="far fa-laugh-beam">
          <span className="iconText">&nbsp;&nbsp;&nbsp;&nbsp;Funny</span>
        </span>
      </section>
    </>
  )
}

export default Categories
