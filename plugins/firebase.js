// // plugins/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
//
// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };
//
// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
//
// // Initialize Firebase Authentication
// const auth = getAuth(app);
//
// // Inject auth into Nuxt context ($auth) and Vue instances (this.$auth)
// // export default (context, inject) => {
// //     inject('firebaseApp', firebaseApp);
// //     inject('auth', auth);
// // };
// export { firebaseApp, auth };// 👈 مستقیم export
