import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './features/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-firebase';
import { Provider as ThemeProvider } from 'rebass';

import { firebaseApp } from './services/firebase';

ReactDOM.render(
	<Provider firebaseApp={firebaseApp}>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
