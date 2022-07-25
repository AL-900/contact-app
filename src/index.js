import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import './style.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import reducer from './scripts/hooks/redux/reducer';

const store = createStore(reducer);

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);
