const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require('./firebaseKey.json'); //dirubah sesuai lokasi penyimpanan service account .json
const dotenv = require('dotenv');
dotenv.config();

// firebaseConfig dirubah sesuai akun firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'photo-exam.firebaseapp.com',
  projectId: 'photo-exam',
  storageBucket: 'photo-exam.appspot.com',
  messagingSenderId: '609493449218',
  appId: '1:609493449218:web:c13bf48330869fb23e051b',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = admin.auth();
const usersRef = db.collection('users');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Unauthorized');
  }
};

module.exports = { admin, firebase, db, usersRef, verifyToken, auth };
