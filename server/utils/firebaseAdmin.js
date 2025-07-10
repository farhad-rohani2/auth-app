// server/utils/firebaseAdmin.js

const admin = require('firebase-admin')
const { readFileSync } = require('fs')
const { join } = require('path')

const serviceAccountPath = join(process.cwd(), 'server/utils/auth-firebase-adminsdk.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

module.exports = {
    adminAuth: admin.auth(),
}
