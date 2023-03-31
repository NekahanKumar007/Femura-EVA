import React, {useState} from 'react';
import Login from './components/login/login'
// import Sidebar from './components/detailing/Sidebar';
import Sidebar1 from './components/HomeScreen/Sidebar1';
import Home from './components/HomeScreen/Home';
import Dashboard from './components/HomeScreen/Dashboard';
import Detailing from './components/HomeScreen/Detailing';
import Quiz from './components/HomeScreen/Quiz';
import ProtectedRoutes from './ProtectedRoutes';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Sidebar from './components/detailing/Sidebar';
function App() {
  

    return (

      <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Detailing />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/detailing" element={<Detailing />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Route>
    </Routes>

    )
   }

export default App;
