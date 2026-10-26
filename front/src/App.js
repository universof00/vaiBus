import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import NearbyPoints from "./pages/NearbyPoints";
import BusSelection from "./pages/BusSelection";
import MyTrip from "./pages/MyTrip";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nearby" element={<NearbyPoints />} />
        <Route path="/buses" element={<BusSelection />} />
        <Route path="/my-trip" element={<MyTrip />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
