import { firebaseApp, firebase } from '../firebase';
import { Observable, Subject } from 'rxjs';

const loginSubject = new Subject<string>();
const loginObservable = loginSubject.distinctUntilChanged().publishReplay(1);

loginSubject.next('obs1'); // So überall
loginObservable.connect();

const isLoggedIn = loginObservable;

const loginWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	const signIn = firebaseApp.auth().signInWithPopup(googleProvider);
	return signIn;
};

const isLoggedInSubject = new Subject<string>();
isLoggedInSubject.next('sub1');

setTimeout(
	() => {
		loginSubject.next('obs2');
		isLoggedInSubject.next('sub2');
	},
	3000
);

const onAuthStateChanged = Observable.create((observer: any) => {
	const connectToFireBase = () => setTimeout(
		() => {
			try {
				firebase.auth().onAuthStateChanged((user) => {
					observer.next(user);
					loginSubject.next('obs3');
					isLoggedInSubject.next('sub3');
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
	isLoggedInSubject,
	onAuthStateChanged,
};
