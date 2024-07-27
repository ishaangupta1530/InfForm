import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Search from './Search';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{
      backgroundImage: 'url("https://kiit.ac.in/wp-content/uploads/2018/07/KIIT-Campus-Front-Library-1200x416.jpg")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
    <App />
    {/* <App />
    <Search />*/}
    </div> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
