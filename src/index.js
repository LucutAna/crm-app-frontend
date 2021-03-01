import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";

//add default header with authorization FIFAToken TODO only for development mode
const FIFAToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im8ybW1zIn0.eyJ0IjoidSIsInN1YiI6IjVlMzJjMWIyNWIyYzVjMDAwYTM2OWM4ZCIsImF1ZCI6ImNybWFwcHRlc3QiLCJzY29wZSI6WyJGSUZBX1BST0ZJTEVfUkVBRCJdLCJpYXQiOjE2MTQwNjk2MTgsImV4cCI6MTYxNDY3NDQxOCwiaXNzIjoibW1zaS1kZXYifQ.Vygr1DUdpQv_bFaaLG_6NCnadc60xpNaMO7zzSvY7TM80zJkoAJUEKiN1Y8ORGdrCxraUkeqQVbZWiFw5rtQCZeybXIDjUamNWCGG6Vd0dh9X8-5bpjeX_E7OlJNiL3TUKYnM3wtK2SNRzSGneBd2sDrbZVmxoaOw2J2LEUtA6snNgHEuf1cizAdwZ4TjGrJBHLMvHt7Gte2xBZqka_yqMo4dOZy_oCmFz0R7etnhaFNDMEBb47IsKFssqctTXZJ_wCo114N0rvNbGZAGW9vAJQ_0CDrGZuxXq2qWsgxSjhS5WokMFcIH1TDnp-sre4uufu0SO4z3ah9TcNRuKS8qg';
axios.defaults.headers.common['Authorization'] = `Bearer ${FIFAToken}`;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);