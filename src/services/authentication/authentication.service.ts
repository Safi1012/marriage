import { firebaseApp, firebase } from '../firebase';


let login = false;
const isLoggedIn = () => login;

const loginWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	const signIn = firebaseApp.auth().signInWithPopup(googleProvider);
	return signIn;
};

const onAuthStateChanged = firebase.auth().onAuthStateChanged;


export {
	loginWithGoogle,
	isLoggedIn,
	onAuthStateChanged,
};
