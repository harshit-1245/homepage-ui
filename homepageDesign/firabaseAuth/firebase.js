// firebase.js
import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB75uOqmiWaZn5PolB-FnvUIuaYLdhMnCg',
  authDomain: 'lelekart-app.firebaseapp.com',
  projectId: 'lelekart-app',
  storageBucket: 'lelekart-app.appspot.com',
  messagingSenderId: '560152851822',
  appId: '1:560152851822:web:5e939bb9a8f65e25bdbd7f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, GoogleAuthProvider };
