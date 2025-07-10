// server/utils/verifyToken.js

const { readFileSync } = require('fs')
const { join } = require('path')
const jwt = require('jsonwebtoken')
const { createPublicKey } = require('crypto')

const keysPath = join(process.cwd(), 'server/utils/firebase_public_keys.json')
const publicKeys = JSON.parse(readFileSync(keysPath, 'utf-8'))

function getKey(header, callback) {
    const key = publicKeys[header.kid]
    if (!key) {
        return callback(new Error('Invalid key ID'))
    }

    // تبدیل X.509 certificate به public key
    const pubKey = createPublicKey({
        key: key,
        format: 'pem',
        type: 'spki'
    })
    callback(null, pubKey.export({ type: 'spki', format: 'pem' }))
}

function verifyFirebaseToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, {
            algorithms: ['RS256'],
            issuer: 'https://securetoken.google.com/YOUR_PROJECT_ID',
            audience: 'YOUR_PROJECT_ID',
        }, (err, decoded) => {
            if (err) return reject(err)
            resolve(decoded)
        })
    })
}

module.exports = { verifyFirebaseToken }
