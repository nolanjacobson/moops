import React, { useState, useEffect } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'

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
      <button onClick={() => props.login()}>
        <div class="steemLogo"></div>
        <div class="steemConnectText">Log in with Steemconnect</div>
      </button>
    </>
  )
}

export default LoginPage
