import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyC1BNAwmdzTrZC5e427aUBQXH9SST5JR4o',
  authDomain: 'vue-quiz-4024b.firebaseapp.com',
  databaseURL: 'https://vue-quiz-4024b.firebaseio.com',
  projectId: 'vue-quiz-4024b',
  storageBucket: 'vue-quiz-4024b.appspot.com',
  messagingSenderId: '228511997776',
  appId: '1:228511997776:web:9711000896a5fa6bba9655',
  measurementId: 'G-G7XMB33R98'
});
export const fb = firebase.firestore();
