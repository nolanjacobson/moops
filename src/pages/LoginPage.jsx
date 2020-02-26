import React, { useState, useEffect } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import LoginStyles from '../CSS/LoginPage.css'
const LoginPage = props => {
  let location = useLocation()
  let accessToken = location.search.substring(14).split('&username')[0]
  if (accessToken) {
    props.client.setAccessToken(accessToken)
    sessionStorage.setItem('accessToken', accessToken)
    props.setTruthyVal(true)
  }
  console.log(accessToken)
  return (
    <>
      {props.truthyVal && <Redirect to={`/home/funny`} />}
      <div className="outer-box">
        <div className="steemConnectText" onClick={() => props.login()}>
          <img
            className="steem-logo"
            src={'https://fundition.io/images/apps/steem.svg'}
          />
          <p>Log in with Steemconnect</p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
