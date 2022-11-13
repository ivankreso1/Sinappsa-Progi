import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssFiles/index.css';
import App from './components/App';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/Register"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element ={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
