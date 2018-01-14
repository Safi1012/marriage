import { firebaseApp, firebase } from '../firebase';
import { Observable, Subject } from 'rxjs';

const loginSubject = new Subject<boolean>();
const isLoggedIn = loginSubject.distinctUntilChanged().publishReplay(1);
isLoggedIn.connect();

const onAuthStateChanged = Observable.create((observer: any) => {
	const connectToFireBase = () => setTimeout(
		() => {
			try {
				firebase.auth().onAuthStateChanged((user) => {
					observer.next(user);
					loginSubject.next(user ? true : false);
				});
			} catch (e) {
				connectToFireBase();
			}
		},
		2);
	connectToFireBase();
});

const loginWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	const signIn = firebaseApp.auth().signInWithRedirect(googleProvider);
	return signIn;
};


export {
	loginWithGoogle,
	isLoggedIn,
	onAuthStateChanged,
};
