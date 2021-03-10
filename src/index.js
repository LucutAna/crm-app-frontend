import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";

//add default header with authorization FIFAToken TODO only for development mode
const FIFAToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im8ybW1zIn0.eyJ0IjoidSIsInN1YiI6IjVlMzJjMWIyNWIyYzVjMDAwYTM2OWM4ZCIsImF1ZCI6ImNybWFwcHRlc3QiLCJzY29wZSI6WyJGSUZBX1BST0ZJTEVfUkVBRCJdLCJpYXQiOjE2MTUzODQ5OTMsImV4cCI6MTYxNTk4OTc5MywiaXNzIjoibW1zaS1kZXYifQ.lj_5Km9qma1Ew1tcDbYt39Wz-au5y-qfsiO82yzA58zEv7CrRZ6rFcgk5g3f-PX2rwC3fSCxOqw4FBew8HpFx_llTtqiyVICyIovdsU-2alNgGW3s_WCsbGXlAP5iGTma_H8_1wNdGBtwuJA36cIY3FGhoVOHRZ-f1owVNSBd6oYo8Act1PIA9MXazt34wL0Y2bZLitNK0WsiWKjPof28HVWgCtq1DxR84spCxqY2xbiGDFFQoBjIDqp8b97a6TPOodamj901yoi3JPLvQrckvZz9iFhG6NQDVXj5oYAoxTeX4tAqYQjrFDX_Rp1MEKVXIjnAtivCX6brSL8R_jAsw';
axios.defaults.headers.common['Authorization'] = `Bearer ${FIFAToken}`;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);