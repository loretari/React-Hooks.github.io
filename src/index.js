import React from 'react';
import ReactDom from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context'

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App/>
    </AuthContextProvider>)