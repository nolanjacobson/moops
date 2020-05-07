import React, { useState, useEffect } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import LoginStyles from '../CSS/LoginPage.css'
import HiveSignerImage from '../images/hivesigner.svg'
const LoginPage = ({
  hiveSignerClient,
  login,
  loginSuccess,
  setLoginSuccess,
}) => {
  let location = useLocation()
  let accessToken = location.search.substring(14).split('&username')[0]
  if (accessToken) {
    hiveSignerClient.setAccessToken(accessToken)
    sessionStorage.setItem('accessToken', accessToken)
    setLoginSuccess(true)
  }
  console.log(loginSuccess, 'loginSuccess')
  return (
    <>
      {loginSuccess ? (
        <Redirect to={`/home/funny`} />
      ) : (
        <Redirect to={'/login'} />
      )}
      <div className="outer-box">
        <div className="hiveConnectText">
          <img
            className="steem-logo"
            src={HiveSignerImage}
            onClick={() => login()}
          />
        </div>
      </div>
    </>
  )
}

export default LoginPage
