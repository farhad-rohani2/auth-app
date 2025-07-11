// server/utils/firebaseTokenVerifier.js

import { readFileSync } from 'fs'
import { join } from 'path'
import jwt from 'jsonwebtoken'

//https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com

const publicKeysPath = join(process.cwd(), 'server/utils/publicKeys.json')
const publicKeys = JSON.parse(readFileSync(publicKeysPath, 'utf-8'))
const authFirebaseAdminSdkPath = join(process.cwd(), 'server/utils/authFirebaseAdminSdk.json')
const authFirebaseAdminSdk = JSON.parse(readFileSync(authFirebaseAdminSdkPath, 'utf-8'))

/**
 * استخراج کلید مناسب بر اساس kid
 */
export function getPublicKeyByKid(kid) {
    return publicKeys[kid]
}

/**
 * تایید توکن JWT با کلید عمومی از فایل
 */
export async function verifyIdTokenLocally(token) {
    const decodedHeader = jwt.decode(token, { complete: true })

    if (!decodedHeader || !decodedHeader.header || !decodedHeader.header.kid) {
        throw new Error('Invalid token header')
    }

    const key = getPublicKeyByKid(decodedHeader.header.kid)

    if (!key) {
        throw new Error('Public key not found for provided kid')
    }

    return jwt.verify(token, key, {
        algorithms: ['RS256'],
        issuer: `https://securetoken.google.com/${authFirebaseAdminSdk.project_id}`,
        audience: authFirebaseAdminSdk.project_id,
    })
}
