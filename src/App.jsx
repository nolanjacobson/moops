import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Page2 from './pages/Page2'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/NotFound'
import HamburgerMenu from './pages/HamburgerMenu'
import LoginPage from './pages/LoginPage'
import Categories from './pages/Categories'
const App = props => {
  let steemConnect = require('steemconnect')
  let client = new steemConnect.Client({
    app: 'theprophet0',
    callbackURL: 'http://127.0.0.1:3000/HomePage',
    scope: ['login', 'vote', 'comment'],
  })
  const [user, setUser] = useState({})
  const [truthyVal, setTruthyVal] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [anotherValue, setAnotherValue] = useState(false)
  const [resp, setResp] = useState({})
  const [x, setX] = useState()
  const [id, setId] = useState('')
  let params = {}
  const login = () => {
    // The "username" parameter is required prior to log in for "Steem Keychain" users.
    if (steemConnect.useSteemKeychain) {
      params = { username: '' }
    }
    client.login(params, function(err, token) {
      console.log(err, token)
      setAccessToken(client.setAccessToken(token))
      console.log(client)
      if (!err) {
        client.me(function(err, res) {
          setResp(res)
          setId(res.account.id)
          console.log(resp)
          console.log(id)
          setAnotherValue(true)
        })
        if (anotherValue) {
          setTruthyVal(true)
        }
      } else {
        setTruthyVal(false)
        alert('Error: please try signing in again.')
      }
    })
  }
  console.log(resp)
  console.log(id)

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/Categories/" component={Categories}></Route>
        <Route
          exact
          path="/HomePage/:id"
          render={() => {
            return <HomePage client={client} accessToken={accessToken} />
          }}
        ></Route>
        <Route
          exact
          path="/Login"
          render={() => {
            id !== '' && (
              <LoginPage
                login={login}
                truthyVal={truthyVal}
                accessToken={accessToken}
                client={client}
                id={id}
                anotherValue={anotherValue}
              />
            )
          }}
        ></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
