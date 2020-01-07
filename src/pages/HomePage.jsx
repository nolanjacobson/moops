import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import HomePageStyles from '../CSS/HomePage.css'
import profilePicture from '../images/githubProfile.PNG'
import { Link } from 'react-router-dom'
import steem from 'steem'
const HomePage = props => {
  const [categoryNames, setCategoryNames] = useState(['Funny'])
  const [showPrev, setShowPrev] = useState(false)
  const [accessToken, setAccessToken] = useState(props.accessToken)
  const resp = steem.api.getActiveWitnesses(function(err, result) {
    console.log(err, result)
  })
  const resp2 = props.client.me(function(err, res) {
    console.log(err, res)
  })
  console.log(resp2)
  console.log(resp)
  console.log(showPrev)
  const showPreviousItem = () => {
    if (!showPrev) {
      setShowPrev(true)
    } else {
      setShowPrev(false)
    }
  }
  const categoryIcons = [
    <i value="Funny" class="far fa-laugh-beam"></i>,
    <i class="far fa-laugh-beam"></i>,
    <i class="far fa-laugh-beam"></i>,
    <i class="far fa-laugh-beam"></i>,
    <i class="far fa-laugh-beam"></i>,
    <i class="far fa-laugh-beam"></i>,
  ]

  const [itemsToShow, setItemsToShow] = useState(5)
  const [expanded, setExpanded] = useState(false)

  const showMore = () => {
    if (!expanded) {
      setExpanded(true)
      setItemsToShow(categoryIcons.length)
    } else {
      setExpanded(false)
      setItemsToShow(5)
    }
  }

  return (
    <>
      <span className="flexIcons">
        <HamburgerMenu />
        <img className="profilePicture" src={profilePicture} />
        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        <i class="fas fa-sync-alt" aria-hidden="true"></i>
        <i class="fa fa-search" aria-hidden="true"></i>
      </span>
      <section className="categoryNameFlex">
        {/* Match props to category name */}
        <div className="categoryName">Funny</div>
        <hr className="moopsGradient"></hr>
      </section>
      <nav className="categoryIconNav">
        {/* <p className="showPrevious" onClick={() => showPreviousItem()}>
          <i class="fas fa-angle-left"></i>
        </p> */}
        <ul className="categoryIconNavUl">
          {categoryIcons.slice(0, itemsToShow).map((icon, index) => {
            {
              return (
                <Link to={icon.value}>
                  <li className="categoryIconNavLi">{icon}</li>
                </Link>
              )
            }
          })}
        </ul>
        {/* <p className="navigateRight">
          <i class="fas fa-angle-right"></i>
        </p> */}
      </nav>
      <a className="btn btn-primary" onClick={showMore}>
        {expanded ? <span>Show less</span> : <span>Show more</span>}
      </a>
    </>
  )
}

export default HomePage
