import { firebaseApp, firebase, User } from '../firebase';
import { Observable, Subject } from 'rxjs';

const loginSubject = new Subject<boolean>();
const isLoggedIn = loginSubject.distinctUntilChanged().publishReplay(1);
isLoggedIn.connect();

const onAuthStateChanged: Observable<User> = Observable.create((observer: any) => {
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
onAuthStateChanged.subscribe();

const loginWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	return firebaseApp.auth().signInWithRedirect(googleProvider);
};

const logout = () => {
	return firebaseApp.auth().signOut();
};


export {
	loginWithGoogle,
	isLoggedIn,
	onAuthStateChanged,
	logout,
};