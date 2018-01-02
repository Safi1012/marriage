import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyD1h-noaQWGGGgt5U9dblVihVVFvtwOqTE',
	authDomain: 'marriage-test.firebaseapp.com',
	databaseURL: 'https://marriage-test.firebaseio.com',
	projectId: 'marriage-test',
	storageBucket: 'marriage-test.appspot.com',
	messagingSenderId: '757149552794',
};

const firebaseApp = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
});

export {
	firebaseApp,
	firebase
};

