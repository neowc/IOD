import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// first do npm install react-error-boundary
import { ErrorBoundary } from 'react-error-boundary'
import ErrorMessage from "./components/ErrorMessage";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
