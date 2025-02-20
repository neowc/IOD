import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// first do npm install react-error-boundary
import { ErrorBoundary } from 'react-error-boundary'
import ErrorMessage from "./components/ErrorMessage.jsx";

console.log(import.meta.env.VITE_TEST_ENV);
// require('dotenv').config();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
