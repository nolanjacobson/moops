const steemConnect = require('steemconnect')
const client = new steemConnect.Client({
  app: 'moops',
  callbackURL: 'http://localhost:3000/login',
  scope: ['login', 'posting', 'vote', 'comment'],
})

export { client, steemConnect }
