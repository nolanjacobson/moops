import React, { useState, useEffect } from 'react'
import { slide as Menu } from 'react-burger-menu'
import HamburgerMenuStyles from '../CSS/HamburgerMenu.css'
import moopsLogo from '../images/moopsResized.PNG'
import { Link } from 'react-router-dom'
const HamburgerMenu = ({
  hiveSignerClient,
  id,
  favorites,
  loginSuccess,
  setLoginSuccess,
}) => {
  const [dropDown, setDropDown] = useState(false)
  const dropDownFunc = () => {
    if (!dropDown) {
      setDropDown(true)
    } else {
      setDropDown(false)
    }
  }

  const logoutFunc = () => {
    if (hiveSignerClient.accessToken === undefined) {
      return
    } else {
      sessionStorage.clear()
      hiveSignerClient.revokeToken(function(err, res) {
        console.log(err, res)
      })
      setLoginSuccess(false)
    }
    window.location.replace('/login')
  }
  return (
    <Menu>
      <img className="moopsLogoMenu" src={moopsLogo} />
      <section className="items">
        <div>
          <a href="/home">
            <span class="fas fa-home"></span>&nbsp;&nbsp;&nbsp;&nbsp;Home
          </a>
        </div>
        <div>
          <Link to={`/profile/${id}`}>
            <span class="far fa-user-circle"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;Profile
          </Link>
        </div>
        <div>
          <a href="/studio">
            <span class="fas fa-video"></span>&nbsp;&nbsp;&nbsp;&nbsp;Studio
          </a>
        </div>
        <div onClick={dropDownFunc}>
          <a>
            <span class="far fa-star"></span> &nbsp;&nbsp;&nbsp;&nbsp;Favourites
          </a>
        </div>
        {dropDown && (
          <section className="dropDown">
            {Object.values(favorites).map((icon, index) => {
              {
                return (
                  <Link to={Object.keys(favorites)[index]}>
                    <li className="categoryIconNavLi">{icon}</li>
                  </Link>
                )
              }
            })}
          </section>
        )}
        <div>
          <a href="/CloseAllTabs">
            <span class="far fa-window-close"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;Close All Tabs
          </a>
        </div>

        <div>
          <a href="/History">
            <span class="fas fa-feather-alt"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;History
          </a>
        </div>
        <div>
          <a href="/Wallet">
            <span class="fas fa-wallet"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;Wallet
          </a>
        </div>
        <div onClick={() => logoutFunc()}>
          <a>
            <span class="fas fa-wallet"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;Logout
          </a>
        </div>
      </section>
    </Menu>
  )
}

export default HamburgerMenu
