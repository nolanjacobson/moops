import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import HomePageStyles from '../CSS/HomePage.css'
import axios from 'axios'
import steem from 'steem'
import BlankProfileImage from '../images/Blank-profile.png'
import CategoriesNav from '../components/CategoriesNav'
import HomePageHeader from '../components/HomePageHeader'
const HomePage = ({
  hiveSignerClient,
  loginSuccess,
  setLoginSuccess,
  match,
}) => {
  const username = JSON.parse(sessionStorage.getItem('user')).user
  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const permlink = Math.random()
    .toString(36)
    .substring(2)

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

  const categoryIcons = {
    funny: <i class="far fa-laugh-beam"></i>,
    animal: <i class="fas fa-paw"></i>,

    nature: <i class="fas fa-seedling"></i>,

    automotive: <i class="fas fa-car"></i>,

    love: <i class="fas fa-hand-holding-heart"></i>,
  }

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
        </>
      )}
    </>
  )
}

export default HomePage
