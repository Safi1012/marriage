declare module 'react-firebase' {
	import * as React from 'react';
	import * as firebase from 'firebase';

	function connect(mapFirebaseToProps?: (props: any, ref: any, firebase: firebase.app.App) => any, mergeProps?: any): any;

	interface ProviderProps {
		firebaseApp: firebase.app.App;
		children: React.ReactChild[] | React.ReactChild | Element;
	}
	export class Provider extends React.Component<ProviderProps, any> {}
}
