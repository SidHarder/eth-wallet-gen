var ethereumjsWallet = require('ethereumjs-wallet')
var wallet = ethereumjsWallet.fromPublicKey('e656799519e41f02c883ea71f61828e47e6e129d65518e2e11ed7e797608f25e')

var jsonString = wallet.toV3('password')
console.log(jsonString)
