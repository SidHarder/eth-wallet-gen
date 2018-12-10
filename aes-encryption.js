var aesjs = require('aes-js')

function encryptPrivateKey(privateKey) {
  var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

  // Convert text to bytes
  var textBytes = aesjs.utils.utf8.toBytes(privateKey)

  // The counter is optional, and if omitted will begin at 1
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
  var encryptedBytes = aesCtr.encrypt(textBytes)

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  return encryptedHex
}

module.exports = {
  encryptPrivateKey
}
