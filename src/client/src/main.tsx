import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<App />
	);
} else {
	console.error('Elemento com ID \'root\' não encontrado.');
}
