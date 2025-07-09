
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAocPM67_yXQK2cXv1urUvELihs-YgRyXE",
    authDomain: "auth-41e94.firebaseapp.com",
    projectId: "auth-41e94",
    storageBucket: "auth-41e94.firebasestorage.app",
    messagingSenderId: "155091243604",
    appId: "1:155091243604:web:c0c3d482cd723a8f8f93c1"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };