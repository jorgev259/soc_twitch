const tmi = require('tmi.js')
const config = require('./config.json')
const options = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: config.username,
    password: config.password
  },
  channels: ['sittingonclouds']
}

const Client = tmi.client
const client = new Client(options)
let current
client.connect()

client.on('chat', (channel, userstate, message, self) => {
  console.log(message)
  if (message === '!playing' && current) {
    client.say(channel, `Now Playing: ${current.artist} - ${current.title}`, 'sittingonclouds')
  }
})

var socket = require('socket.io-client')('https://api.sittingonclouds.net')
socket.on('metadata', async (data) => {
  console.log(data)
  current = data
  client.say('sittingonclouds', `Now Playing: ${data.artist} - ${data.title}`, 'sittingonclouds')
})
