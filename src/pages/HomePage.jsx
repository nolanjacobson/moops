import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import HomePageStyles from '../CSS/HomePage.css'
import profilePicture from '../images/githubProfile.PNG'
import { Link } from 'react-router-dom'
import axios from 'axios'
import steem from 'steem'
const HomePage = props => {
  const [categoryNames, setCategoryNames] = useState(['Funny'])
  const [showPrev, setShowPrev] = useState(false)
  const [testBool, setTestBool] = useState(false)

  // const resp = steem.api.getActiveWitnesses(function(err, result) {
  //   console.log(err, result)

  // })
  // console.log(resp)
  // const [accessToken, setAccessToken] = useState(props.accessToken)
  // console.log(accessToken)
  // console.log(
  //   props.client.me(function(err, res) {
  //     console.log(err, res)
  //   })
  // )
  // console.log(showPrev)
  // console.log(localStorage.getItem('token'))
  // let client = localStorage.getItem('client')
  useEffect(() => {
    props.client.setAccessToken(sessionStorage.getItem('accessToken'))
    console.log(props.client.accessToken)
    setTestBool(true)
  }, [])
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

  const meCall = async () => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem(
      'accessToken'
    )
    const response = await axios.post('https://api.steemconnect.com/api/me')
    console.log(response, 'test')
    // console.log(props.client.accessToken)
    // props.client.me(function(err, res) {
    //   console.log(err, res)
    // })
  }

  useEffect(() => {
    meCall()
  }, [])
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
      {testBool &&
        console.log(
          props.client.me(function(err, res) {
            console.log(err, res)
          })
        )}
      <span className="flexIcons">
        <HamburgerMenu />
        <img className="profilePicture" src={profilePicture} />
        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        <i class="fas fa-sync-alt" aria-hidden="true"></i>
        <i class="fa fa-search" aria-hidden="true"></i>
      </span>
      <section className="categoryNameFlex">
        {/* Match props to category name */}
        <button
          onClick={() =>
            props.client.revokeToken(function(err, res) {
              console.log(err, res)
            })
          }
        >
          Logout
        </button>
        <div className="categoryName">Funny </div>
        <hr className="moopsGradient"></hr>
      </section>
      <nav className="categoryIconNav">
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
      </nav>
      <a className="btn btn-primary" onClick={showMore}>
        {expanded ? <span>Show less</span> : <span>Show more</span>}
      </a>
    </>
  )
}

export default HomePage
