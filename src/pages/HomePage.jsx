import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import HomePageStyles from '../CSS/HomePage.css'
import axios from 'axios'
import steem from 'steem'
import BlankProfileImage from '../images/Blank-profile.png'
import CategoriesNav from '../components/CategoriesNav'
import HomePageHeader from '../components/HomePageHeader'
import FunnyVideoThumbnail from '../images/funnyvideothumbnail.jpg'
import LikeIcon from '../images/whitelike.png'
import CommentIcon from '../images/whitecomment.png'

const HomePage = ({
  hiveSignerClient,
  loginSuccess,
  setLoginSuccess,
  match,
}) => {
  const username = JSON.parse(sessionStorage.getItem('user')).user
  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [description, setDescription] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      if (sessionStorage.getItem('profileImage')) {
        setProfileImage(sessionStorage.getItem('profileImage'))
      }
      hiveSignerClient.setAccessToken(sessionStorage.getItem('accessToken'))
    } else {
      window.location.replace('/login')
    }
  }, [])
  let str = 'Old man trys riding bike when going to sleep on'
  const categoryIcons = {
    funny: <i class="far fa-laugh-beam"></i>,
    animal: <i class="fas fa-paw"></i>,

    nature: <i class="fas fa-seedling"></i>,

    automotive: <i class="fas fa-car"></i>,

    love: <i class="fas fa-hand-holding-heart"></i>,
  }

  // make sure the description string is less than 47 characters, then break.
  return (
    <>
      {console.log(username)}
      {sessionStorage.getItem('accessToken') && (
        <>
          <span className="flexIcons">
            <HamburgerMenu
              loginSuccess={loginSuccess}
              setLoginSuccess={setLoginSuccess}
              id={username}
              hiveSignerClient={hiveSignerClient}
              favorites={categoryIcons}
            />
            <HomePageHeader profileImage={profileImage} id={username} />
          </span>
          <CategoriesNav match={match} categoryIcons={categoryIcons} />
          <div className="videos-outer-flex">
            <div className="videos-inner-flex">
              <div className="video">
                <img src={CommentIcon} />

                <span className="comments">153</span>
                <img src={LikeIcon} className="like-icon" />
                <span className="likes">500</span>
                <img className="video-thumbnail" src={FunnyVideoThumbnail} />
                <div className="description">Dog dressed as human is funny</div>
                <span className="hive-value">$1277</span>
                <span className="time">23 hours ago</span>
              </div>
              <div className="video">
                <span className="comments">153</span>
                <img src={LikeIcon} className="like-icon" />
                <span className="likes">500</span>
                <img className="video-thumbnail" src={FunnyVideoThumbnail} />
                <div className="description">
                  Old man trys riding bike when going to sleep on
                </div>
                <span className="hive-value">$1277</span>
                <span className="time">23 hours ago</span>
              </div>
              <div className="video">
                <span className="comments">153</span>
                <img src={LikeIcon} className="like-icon" />

                <span className="likes">500</span>
                <img className="video-thumbnail" src={FunnyVideoThumbnail} />
                <div className="description"></div>
                <span className="hive-value">$1277</span>
                <span className="time">23 hours ago</span>
              </div>
              <div className="video">
                <span className="comments">153</span>
                <img src={LikeIcon} className="like-icon" />

                <span className="likes">500</span>
                <img className="video-thumbnail" src={FunnyVideoThumbnail} />
                <div className="description"></div>
                <span className="hive-value">$1277</span>
                <span className="time">23 hours ago</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomePage
