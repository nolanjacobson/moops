import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Page2 from './pages/Page2'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/NotFound'
import HamburgerMenu from './pages/HamburgerMenu'
import LoginPage from './pages/LoginPage'
import Categories from './pages/Categories'
import Studio from './pages/Studio'
import ProfilePage from './pages/ProfilePage'
let steemConnect = require('steemconnect')
let client = new steemConnect.Client({
  app: 'moops',
  callbackURL: 'http://localhost:3000/home',
  scope: ['login', 'posting', 'vote', 'comment'],
})
let WebTorrent = require('webtorrent')
let webTorrentClient = new WebTorrent()
const App = () => {
  console.log(webTorrentClient)
  const [user, setUser] = useState({})
  const [truthyVal, setTruthyVal] = useState(false)
  const [anotherValue, setAnotherValue] = useState(false)
  const [resp, setResp] = useState({})
  const [x, setX] = useState()
  const [id, setId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  let params = {}
  useEffect(() => {
    if (id) {
      setTruthyVal(true)
    }
    // console.log('accessToken', client.accessToken)
  }, [id])
  const login = () => {
    // The "username" parameter is required prior to log in for "Steem Keychain" users.
    if (steemConnect.useSteemKeychain) {
      params = { username: '' }
    }
    client.login(params, function(err, token) {
      // console.log(client.getLoginURL())
      console.log('test')
      setAccessToken(client.setAccessToken(token))
      sessionStorage.setItem('accessToken', token)
      if (!err) {
        client.me(function(err, res) {
          setResp(res)
          setId(res.user)
          console.log(resp)
          console.log(id)
        })
      } else {
        setTruthyVal(false)
        alert('Error: please try signing in again.')
      }
    })
  }
  console.log(resp)

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/Categories/" component={Categories}></Route>
        <Route
          exact
          path="/home/:id"
          render={() => (
            <HomePage client={client} webTorrentClient={webTorrentClient} />
          )}
        ></Route>
        <Route
          exact
          path="/home"
          render={() => (
            <HomePage client={client} webTorrentClient={webTorrentClient} />
          )}
        ></Route>
        <Route
          exact
          path="/Login"
          render={() => (
            <LoginPage login={login} id={id} truthyVal={truthyVal} />
          )}
        ></Route>
        <Route
          exact
          path="/studio"
          render={() => (
            <Studio client={client} webTorrentClient={webTorrentClient} />
          )}
        ></Route>
        <Route
          exact
          path="/profile/:id"
          render={props => <ProfilePage {...props} client={client} />}
        ></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
