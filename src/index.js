import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadScript } from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyDsc0jaxFvFYsc1b3Tblah0n1LV3RfZZDQ";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={["drawing", "places"]}
    >
      <App />
    </LoadScript>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
