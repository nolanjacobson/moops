import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Page2 from './pages/Page2'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/NotFound'
import HamburgerMenu from './pages/HamburgerMenu'
import LoginPage from './pages/LoginPage'
import Categories from './pages/Categories'
let steemConnect = require('steemconnect')
let client = new steemConnect.Client({
  app: 'moops',
  callbackURL: 'http://127.0.0.1:3000/HomePage',
  scope: ['login', 'posting', 'vote', 'comment'],
})
const App = () => {
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
      // console.log(err, token)
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
          path="/HomePage/:id"
          render={() => <HomePage client={client} />}
        ></Route>
        <Route
          exact
          path="/Login"
          render={() => (
            <LoginPage login={login} id={id} truthyVal={truthyVal} />
          )}
        ></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
