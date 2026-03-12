import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from "react-redux";
import { store } from "./store"; // Import Redux store


import ReactGA from "react-ga4";

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (trackingId) {
  ReactGA.initialize(trackingId, {
    gtagOptions: {
      send_page_view: false
    }
  }); 
}

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
