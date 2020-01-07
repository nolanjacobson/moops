import React, { useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
import HamburgerMenuStyles from '../CSS/HamburgerMenu.css'
import moopsLogo from '../images/moopsResized.PNG'
const HamburgerMenu = props => {
  const [dropDown, setDropDown] = useState(false)
  const dropDownFunc = () => {
    if (!dropDown && props.favorites.length < 5) {
      setDropDown(true)
    } else {
      setDropDown(false)
    }
  }
  return (
    <Menu>
      <img className="moopsLogoMenu" src={moopsLogo} />
      <section className="items">
        <div>
          <a href="/Home">
            <span class="fas fa-home"></span>
            <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;Home</p>
          </a>
        </div>
        <div>
          <a href="/Profile">
            <span class="far fa-user-circle"></span>
            <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;Profile</p>
          </a>
        </div>
        <div>
          <a href="/Studio">
            <span class="fas fa-video"></span>
            <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;Studio</p>
          </a>
        </div>
        <div onClick={dropDownFunc}>
          <span class="far fa-star"></span>
          <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;Favourites</p>
        </div>
        {/* Return users favorite categories here. */}
        {dropDown && (
          <div className="dropDown">
            {props.favorites
              .filter(item => item.length <= 5)
              .map(item => {
                return item
              })}
          </div>
        )}
        <div>
          <a href="/CloseAllTabs">
            <span class="far fa-window-close"></span>
            <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;Close All Tabs</p>
          </a>
        </div>
       
          <a href="/History">
            <span class="fas fa-feather-alt"></span>
            <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;History</p>
          </a>
        
        <div>
          <a href="/Wallet">
            <span class="fas fa-wallet"></span>
            <p className="iconTextHamburger">&nbsp;&nbsp;&nbsp;&nbsp;Wallet</p>
          </a>
        </div>
      </section>
    </Menu>
  )
}

export default HamburgerMenu
