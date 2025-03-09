// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Get Telegram WebApp User Data
window.Telegram.WebApp.ready();
const user = window.Telegram.WebApp.initDataUnsafe.user;

if (user) {
    const userId = user.id;
    const username = user.username || `User_${userId}`; // Use ID if username is missing

    // Save user data to Firebase
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
