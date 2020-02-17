import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

const LoginPage = props => {
  return (
    <>
      {props.truthyVal && <Redirect to={`/home/${props.id}`} />}
      <button onClick={() => props.login()}>
        <div class="steemLogo"></div>
        <div class="steemConnectText">Log in with Steemconnect</div>
      </button>
    </>
  )
}

export default LoginPage
