const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const keccak256 = require('js-sha3').keccak256
const crypto = require('crypto')
var aesjs = require('aes-js')
var scrypt = require('scryptsy')

function generate(password, callback) {
  getPrivateKey(function (err, privateKey) {
    var encryptedPrivateKey = encryptPrivateKey(privateKey)
    var ethAddress = getEthAddress(privateKey)
    var wallet = getWalletJson(encryptedPrivateKey, ethAddress)
    callback(null, wallet)
  })
}

function getPrivateKey(callback) {
  crypto.randomBytes(32, (err, buf)=> {
    if (err) throw err
    const privateKey = buf.toString('hex')
    callback(null, privateKey)
  })
}

function getEthAddress(privateKey) {
  var generatorPoint = ec.g
  var pubKeyCoordinates = generatorPoint.mul(privateKey)
  var x = pubKeyCoordinates.getX().toBuffer()
  var y = pubKeyCoordinates.getY().toBuffer()
  var publicKeyBuffer = Buffer.concat([x,y])
  var hashOfPublicKey = keccak256(publicKeyBuffer)
  var ethAddressBuffer = new Buffer.from(hashOfPublicKey, 'hex')
  var ethAddress = ethAddressBuffer.slice(-20).toString('hex')
  var ethAddressWithPrefix = `0x${ethAddress}`
  return ethAddressWithPrefix
}

function encryptPrivateKey(privateKey) {
  var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

  // Convert text to bytes
  var textBytes = aesjs.utils.utf8.toBytes(privateKey)

  // The counter is optional, and if omitted will begin at 1
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
  var encryptedBytes = aesCtr.encrypt(textBytes)

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)


  console.log(privateKey)
  console.log(encryptedHex)
  return encryptedHex
}

function getWalletJson(encryptedPrivateKey, ethAddress) {
  var wallet = {
    addressgoeshear: {
      crypto: {
        cypher: 'aes-128-ctr',
        cipherparams: null,
        cypherText: null,
        kdf: 'script',
        kdfparams: {
                dklen: 32,
                n: 100,
                r: 1,
                p: 8,
                salt: 'ab0c7876052600dd703518d6fc3fe8984592145b591fc8fb5c6d43190334ba19'
        },
        mac: null,

      },
      id: null,
      version: 3
    }
  }

  wallet.cypherText = encryptedPrivateKey
  return JSON.stringify(wallet)
}

function kdfScript(password) {
  var salt = "ab0c7876052600dd703518d6fc3fe8984592145b591fc8fb5c6d43190334ba19"
  var data = scrypt(password, salt, 1, 1, 8, 32)
  console.log(data.toString('hex'))
}

module.exports = {
    generate,
    getWalletJson,
    kdfScript
}
