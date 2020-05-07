import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/NotFound'
import HamburgerMenu from './pages/HamburgerMenu'
import LoginPage from './pages/LoginPage'
import Categories from './pages/Categories'
import Studio from './pages/Studio'
import ProfilePage from './pages/ProfilePage'
import { client } from './utils/HiveChainApi'
import { hiveSignerClient } from './utils/HiveSigner'
import steem from 'steem'

const App = () => {
  // user hook is used to collect response from login
  const [user, setUser] = useState({})
  // loginSuccess hook is used to pass down a true/false value to the login component
  const [loginSuccess, setLoginSuccess] = useState(false)

  // used an effect because of time synchronization between loginSuccess and user object
  useEffect(() => {
    console.log('user', user)
    if (user._id) {
      setLoginSuccess(true)
    }
  }, [user])
  const login = () => {
    // The "username" parameter is required prior to log in for "Steem Keychain" users.
    let params = {}
    if (hiveSignerClient.useHiveKeychain) {
      params = { username: '' }
    }
    hiveSignerClient.login(params, function(err, token) {
      hiveSignerClient.setAccessToken(token)
      sessionStorage.setItem('accessToken', token)
      if (!err) {
        hiveSignerClient.me(function(err, res) {
          if (!err) {
            // store the user in sessionstorage to easily fetch immutable data without making new api calls
            sessionStorage.setItem('user', JSON.stringify(res))
            setUser(res)
            let validImage = JSON.parse(res.account.json_metadata)

            if (validImage.profile.profile_image !== '') {
              // store the profileimage in session storage to make app more efficient and reload when needed
              sessionStorage.setItem(
                'profileImage',
                validImage.profile.profile_image
              )
            }
            steem.api.getAccounts([res.user], function(err, result) {
              if (
                'cover_image' in
                JSON.parse(result[0].posting_json_metadata).profile
              ) {
                sessionStorage.setItem(
                  'backgroundImage',
                  JSON.parse(result[0].posting_json_metadata).profile
                    .cover_image
                )
              }
            })
          } else {
            console.log(err, 'error')
          }
        })
      } else {
        setLoginSuccess(false)
        alert('Error: please try signing in again.')
      }
    })
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/Categories/" component={Categories}></Route>
        <Route
          exact
          path="/home/:category"
          render={props => (
            <HomePage
              {...props}
              client={client}
              hiveSignerClient={hiveSignerClient}
              loginSuccess={loginSuccess}
              setLoginSuccess={setLoginSuccess}
            />
          )}
        ></Route>
        <Route
          exact
          path="/home"
          render={props => (
            <HomePage
              {...props}
              client={client}
              hiveSignerClient={hiveSignerClient}
            />
          )}
        ></Route>
        <Route
          exact
          path="/login"
          render={() => (
            <LoginPage
              login={login}
              client={client}
              loginSuccess={loginSuccess}
              hiveSignerClient={hiveSignerClient}
              setLoginSuccess={setLoginSuccess}
            />
          )}
        ></Route>
        <Route
          exact
          path="/studio"
          render={() => (
            <Studio client={client} hiveSignerClient={hiveSignerClient} />
          )}
        ></Route>
        <Route
          exact
          path="/profile/:id"
          render={props => (
            <ProfilePage
              {...props}
              client={client}
              hiveSignerClient={hiveSignerClient}
            />
          )}
        ></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
