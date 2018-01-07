import { firebaseApp, firebase } from '../firebase';
import { Observable } from 'rxjs';

let login = false;
const isLoggedIn = () => login;

const loginWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	const signIn = firebaseApp.auth().signInWithPopup(googleProvider);
	return signIn;
};

const onAuthStateChanged = Observable.create((observer: any) => {
	const connectToFireBase = () => setTimeout(
		() => {
			try {
				firebase.auth().onAuthStateChanged((user) => {
					observer.next(user);
				});
			} catch (e) {
				connectToFireBase();
			}
		},
		2);
	connectToFireBase();
});


export {
	loginWithGoogle,
	isLoggedIn,
	onAuthStateChanged,
};
