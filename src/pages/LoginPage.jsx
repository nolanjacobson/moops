import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
const LoginPage = props => {
  const [id, setId] = useState('')
  const [anotherVal, setAnotherVal] = useState(false)
  useEffect(() => {
    if (props.anotherValue) {
      setId(props.id)
      console.log(id)
      if (!anotherVal) {
        setAnotherVal(true)
      }
    }
  }, [props.truthyVal])
  return (
    <>
      {console.log(id)}
      {anotherVal && <Redirect to={`/HomePage/${id}`} />}
      <button onClick={() => props.login()}>
        <div class="steemLogo"></div>
        <div class="steemConnectText">Log in with Steemconnect</div>
      </button>
    </>
  )
}

export default LoginPage
