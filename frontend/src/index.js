import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {
    store,persistor
} from './react-redux/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';


store.subscribe(() => {
    console.log('State_Updated', store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

            <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>

)


