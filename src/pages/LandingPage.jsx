import React, { useEffect } from 'react'
import moopsBackgroundImage from '../images/moopsbackground.png'
import { Link, Redirect } from 'react-router-dom'
import LandingPage from '../CSS/LandingPage.css'
import axios from 'axios'
const HomePage = () => {
  return (
    <div className="flex">
      <img
        className="moopsBackgroundImage"
        src={moopsBackgroundImage}
        alt="Moops Picture"
      />
      <div className="outerBox">
        <p className="termsOfService">
          By clicking the button below, you agree to the{' '}
          <a href="">Terms &#38; Services</a>
        </p>
      </div>
      <a href="/Login">
        <button className="agreement">I AGREE</button>
      </a>
    </div>
  )
}

export default HomePage
