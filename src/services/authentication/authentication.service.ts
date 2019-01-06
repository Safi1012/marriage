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
					if (user) {
						loginSubject.next(true);
					} else {
						loginSubject.next(false);
					}
				});
			} catch (e) {
				connectToFireBase();
			}
		},
		2);
	connectToFireBase();
});
onAuthStateChanged.subscribe();

const signIn = (loginCode: string) => {
	return fetch(`http://localhost:8080/?loginCode=${loginCode}`)
		.then((res) => {
			if (res.status >= 400) {
				throw res;
			}
			return res;
		})
		.then(res => res.json())
		.then(token => firebaseApp.auth().signInWithCustomToken(token));
};

const UrlLoginCodePattern = new RegExp(/\/\w{8}$/);
const LoginCodePattern = new RegExp(/\w{8}$/);
const getLoginCode = () => {
	const path = window.location.pathname;
	if (UrlLoginCodePattern.test(path)) {
		return path.replace('/', '');
	}
	return '';
};

const logout = () => {
	return firebaseApp.auth().signOut();
};


export {
	signIn,
	getLoginCode,
	LoginCodePattern,
	isLoggedIn,
	onAuthStateChanged,
	logout,
};
