import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 için güncellenmiş import
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// React 18'de createRoot kullanımı
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
