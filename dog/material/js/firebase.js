// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWyrP8xniw9kUJUBVCdhEIRs3Mw-BATj0",
    authDomain: "brics-pay.firebaseapp.com",
    databaseURL: "https://brics-pay-default-rtdb.firebaseio.com",
    projectId: "brics-pay",
    storageBucket: "brics-pay.firebasestorage.app",
    messagingSenderId: "516647996624",
    appId: "1:516647996624:web:a881e38c92c3c7cb3ea2d5",
    measurementId: "G-XPLKCMKF79"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Ensure Telegram WebApp is ready
window.Telegram.WebApp.ready();
const user = window.Telegram.WebApp.initDataUnsafe.user;

if (user) {
    const userId = user.id;
    const username = user.username || `User_${userId}`; // Use ID if no username

    // Save user data to Firebase Realtime Database
    firebase.database().ref('users/' + userId).set({
        id: userId,
        username: username,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        language: user.language_code || ''
    }).then(() => {
        console.log("User data saved successfully!");
    }).catch(error => {
        console.error("Error saving user data:", error);
    });
}
