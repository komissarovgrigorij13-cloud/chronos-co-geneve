import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Always start a fresh page load at the beginning instead of restoring a
// previous scroll position from the browser session.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
