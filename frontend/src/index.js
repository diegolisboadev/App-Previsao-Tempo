import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';

// Componentes
import Header from "./components/Header";
import FormPesquisaCidade from "./components/FormPesquisaCidade";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <FormPesquisaCidade />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
