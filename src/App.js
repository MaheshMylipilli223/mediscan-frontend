import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home";
import CreateTest from "./components/Create/CreateTest";
import DiaProfile from "./components/DiaProfile/DiaProfile";
import PatReq from './components/PatReq/PatReq';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import PatientRegister from './components/Pat-reg/Pat-reg';
import DiagnosisSignIn from './components/LoginDia/LoginDia';
import DiagnosisRegister from './components/Dia-reg/Dia-reg';
import UserHome from './components/UserHome/UserHome';
import UserBookings from './components/UserBookings/UserBookings';
import ApolloBot from './components/ApolloBot/ApolloBot';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path='/diagonsis-profile' element={<DiaProfile />} />
        <Route path='/pat-req' element={<PatReq />} />
        <Route path="/login-pat" element={<Login />} />
        <Route path='/pat-reg' element={<PatientRegister />} />
        <Route path='/login-dia' element={<DiagnosisSignIn />} />
        <Route path='/dia-reg' element={<DiagnosisRegister />} />
        <Route path='/userhome' element={<UserHome />} />
        <Route path='/mybookings' element={<UserBookings />} />
        <Route path='/apollo' element={<ApolloBot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App