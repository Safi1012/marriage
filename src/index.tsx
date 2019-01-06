import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './features/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-firebase';
import { Provider as ThemeProvider } from 'rebass';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { firebaseApp } from './services/firebase';

const history = createBrowserHistory();

ReactDOM.render(
	<Provider firebaseApp={firebaseApp}>
		<ThemeProvider>
			<Router history={history}>
				<App />
			</Router>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
