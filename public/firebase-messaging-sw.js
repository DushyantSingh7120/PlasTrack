// Scripts for Firebase Cloud Messaging background process
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCSAQuI8qseXu2js_UigcNXqspU0Ao_4iU",
  authDomain: "plastitrack-e231a.firebaseapp.com",
  projectId: "plastitrack-e231a",
  storageBucket: "plastitrack-e231a.firebasestorage.app",
  messagingSenderId: "700500715665",
  appId: "1:700500715665:web:749eaf521ebb66ed4fb730",
  measurementId: "G-756PB9MF76"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title || 'PlastiTrack Reminder';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
