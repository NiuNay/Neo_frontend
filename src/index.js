import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
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
    </Router>,

    document.getElementById("root")
);