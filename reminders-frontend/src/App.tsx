import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

function App() {
  //http://127.0.0.1:8000/backend/
  return (
    <Router>
        <Routes>
            <Route element={<AuthProvider />}>
              <Route element={<Header />}>
                <Route element = {<PrivateRoute />} >
                  <Route path="/" element={<HomePage/>} />
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
              </Route>
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
