import * as firebase from 'firebase';

interface User extends firebase.UserInfo {}
interface Reference extends firebase.database.Reference{}
interface App extends firebase.app.App{}
interface Database extends firebase.database.Database{}
interface Auth extends firebase.auth.Auth{}

const config = {
	apiKey: 'AIzaSyD1h-noaQWGGGgt5U9dblVihVVFvtwOqTE',
	authDomain: 'marriage-test.firebaseapp.com',
	databaseURL: 'https://marriage-test.firebaseio.com',
	projectId: 'marriage-test',
	storageBucket: 'marriage-test.appspot.com',
	messagingSenderId: '757149552794',
};

const firebaseApp = firebase.initializeApp(config);


export {
	firebaseApp,
	firebase,
	User,
	Reference,
	App,
	Database,
	Auth,
};

