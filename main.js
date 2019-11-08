const TwitchBot = require('twitch-bot')
let current

const Bot = new TwitchBot({
  username: 'ChitoWarlock',
  oauth: 'oauth:wte5f90a9ntchorsqbzzzr0chjqkgs',
  channels: ['sittingonclouds']
})

Bot.on('error', err => {
  console.log(err)
})

Bot.on('message', chatter => {
  if (chatter.message === '!playing' && current) {
    Bot.say(`Now Playing: ${current.artist} - ${current.title}`, 'sittingonclouds')
  }
})

var socket = require('socket.io-client')('https://api.sittingonclouds.net')
socket.on('metadata', async (data) => {
  console.log(data)
  current = data
  Bot.say(`Now Playing: ${data.artist} - ${data.title}`, 'sittingonclouds')
})
