import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalProvider from './contexts/GlobalContext.jsx'
import AuthProvider from './contexts/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
    <GlobalProvider>
        <AuthProvider>
            <App />
            <Toaster />
        </AuthProvider>
    </GlobalProvider>
)
