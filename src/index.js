import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import 'typeface-roboto'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Login,
    MainMenu,
    Calibration,
    Comment,
    PrickReading,
    GlucoseLevels,
    PatientSelection,
} from "./components";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu" element={<MainMenu />} />
                <Route path="/calibration" element={<Calibration />} />
                <Route path="/comment" element={<Comment />} />
                <Route path="/prickreading" element={<PrickReading />} />
                <Route path="/glucoselevels" element={<GlucoseLevels />} />
                <Route path="/PatientSelection" element={<PatientSelection />} />
            </Routes>
        </Router>
    </Provider>,

    document.getElementById("root"),

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();