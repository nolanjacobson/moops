import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import HomePageStyles from '../CSS/HomePage.css'
import profilePicture from '../images/githubProfile.PNG'
import { Link } from 'react-router-dom'
import axios from 'axios'
import steem from 'steem'
import BlankProfileImage from '../images/Blank-profile.png'
const HomePage = props => {
  const [categoryNames, setCategoryNames] = useState([
    'Funny',
    'Action',
    'Cats',
  ])
  const [showPrev, setShowPrev] = useState(false)
  const [testBool, setTestBool] = useState(false)
  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [username, setUsername] = useState('')
  const permlink = Math.random()
    .toString(36)
    .substring(2)
  useEffect(() => {
    props.client.setAccessToken(sessionStorage.getItem('accessToken'))
    console.log(props.client.accessToken)
    setTestBool(true)
    var query = {
      tag: 'steemit', // This tag is used to filter the results by a specific post tag
      limit: 5, // This limit allows us to limit the overall results returned to 5
    }
    steem.api.getDiscussionsByTrending(query, function(err, result) {
      console.log(err, result)
    })
  }, [])
  useEffect(() => {
    if (testBool) {
      props.client.me(function(err, res) {
        let validImage = JSON.parse(res.account.json_metadata)

        if (!err && validImage.profile.profile_image !== '') {
          setProfileImage(validImage.profile.profile_image)
          setUsername(res.user)
        }
      })
    }
  }, [testBool])
  const showPreviousItem = () => {
    if (!showPrev) {
      setShowPrev(true)
    } else {
      setShowPrev(false)
    }
  }
  const categoryIcons = {
    funny: <i class="far fa-laugh-beam"></i>,
    animal: <i class="fas fa-paw"></i>,

    nature: <i class="fas fa-seedling"></i>,

    automotive: <i class="fas fa-car"></i>,

    love: <i class="fas fa-hand-holding-heart"></i>,
  }

  const [itemsToShow, setItemsToShow] = useState(5)
  const [expanded, setExpanded] = useState(false)

  // const meCall = async () => {
  //   axios.defaults.headers.common['Authorization'] = sessionStorage.getItem(
  //     'accessToken'
  //   )
  //   const response = await axios.post('https://api.steemconnect.com/api/me')
  //   console.log(response, 'test')
  // }

  // useEffect(() => {
  //   makeNewPost()
  // }, [])
  const makeNewPost = () => {
    props.client.comment(
      '',
      'moops',
      username,
      permlink,
      'steemconnect test',
      'steemconnect test body',
      JSON.stringify({ tags: 'moops' }),
      function(err, res) {
        console.log(err, res)
      }
    )
  }

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
        <HamburgerMenu client={props.client} favorites={categoryIcons} />

        <img className="profilePicture" src={profileImage} />

        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        <i
          class="fas fa-sync-alt"
          aria-hidden="true"
          onClick={() => window.location.reload()}
        ></i>
        <i class="fa fa-search" aria-hidden="true"></i>
      </span>
      <section className="categoryNameFlex">
        {/* Match props to category name */}
        {/* <button onClick={() => logoutFunc()}>Logout</button> */}
        <div className="categoryName">Funny </div>
        <hr className="moopsGradient"></hr>
      </section>
      <nav className="categoryIconNav">
        <ul className="categoryIconNavUl">
          {Object.values(categoryIcons).map((icon, index) => {
            {
              return (
                <Link to={Object.keys(categoryIcons)[index]}>
                  <li className="categoryIconNavLi">{icon}</li>
                </Link>
              )
            }
          })}
        </ul>
      </nav>
      <button onClick={makeNewPost}>Post</button>
      {/* <a className="btn btn-primary" onClick={showMore}>
        {expanded ? <span>Show less</span> : <span>Show more</span>}
      </a> */}
    </>
  )
}

export default HomePage
