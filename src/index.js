import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";

//add default header with authorization FIFAToken TODO only for development mode
const FIFAToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im8ybW1zIn0.eyJ0IjoidSIsInN1YiI6IjVlMzJjMWIyNWIyYzVjMDAwYTM2OWM4ZCIsImF1ZCI6ImNybWFwcHRlc3QiLCJzY29wZSI6WyJGSUZBX1BST0ZJTEVfUkVBRCJdLCJpYXQiOjE2MTQ3ODAwODYsImV4cCI6MTYxNTM4NDg4NiwiaXNzIjoibW1zaS1kZXYifQ.MWZNSOl4H6edbIIF7dBRz_kP6bSCgFvfpT_awda0TpSgKlw7Jbs_w6W-LznwSrFmzcLBQ614WTeM1DQY5MTnWlLB8n1uRhqLVo59XXkOfc03KYt9spSAsc5wfT6YCEcUysRS87sNvFw3ZoxiSJh9C9MLxGenKrABiTbKopk6Z7grhXVliOZP1bUgjlG-6ZXGi5Q3TnoiCkuob3EA9HkmD6zyQrdehe5PuAObR1rqS6q6wWfoJtgsOJlhJz8-Y-hxp-_2nRofErYxcNuJkxQGmDKF7l4qbFrZqbofXkx163DPVjKspTwjTxMAFHv6LyAkwmbH4gOeCaupzX9AZ2ol4g';
axios.defaults.headers.common['Authorization'] = `Bearer ${FIFAToken}`;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);