var jayson = require('jayson')

// create a server
var server = jayson.server({
  add: function(args, callback) {
    callback(null, args[0] + args[1] + 5)
  },
  newWallet: function(args, callback) {
    callback(null, "this is the eth address")
  }
})

console.log('Listening on port: 3000')
server.http().listen(3000)
