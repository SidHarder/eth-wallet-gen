var walletGenerator = require('./wallet-generator')

//var result = hello.getWalletJson("123123", "33333")
//console.log(result)

//walletGenerator.generate('password', function(err, result) {
//  console.log(result)
//})

//var encryptedPrivateKey = aes.encryptPrivateKey('adkfjalksdfjladkfj')
//console.log(encryptedPrivateKey)

var result = walletGenerator.kdfScript('password');
