import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    <Toaster
  position="top-center"
  toastOptions={{
    duration: 2500,
    style: {
      borderRadius: "12px",
      background: "#264653",
      color: "#fff",
    },
  }}
/>
  </Provider>
  </BrowserRouter>
)
