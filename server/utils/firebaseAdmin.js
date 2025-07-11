// server/utils/firebaseAdmin.js

const admin = require('firebase-admin')

if (admin.apps.length === 0) {
    const config = useRuntimeConfig();

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: config.project_id,
            clientEmail: config.client_email,
            privateKey: config.private_key
        }),
    });
}

module.exports = {
    adminAuth: admin.auth(),
}