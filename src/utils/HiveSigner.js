const hiveSigner = require('hivesigner')

const hiveSignerClient = new hiveSigner.Client({
  app: 'moops.app',
  callbackURL: 'https://localhost:3000/',
  scope: ['vote', 'comment'],
})

export { hiveSignerClient }
