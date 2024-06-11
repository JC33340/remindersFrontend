import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import CreateUser from './pages/CreateUser';
import CreateProfile from './pages/CreateProfile';

function App() {
  return (
    <Router>
        <Routes>
            <Route element={<AuthProvider />}>
              <Route element={<Header />}>
                <Route element = {<PrivateRoute />} >
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/create-profile" element={<CreateProfile />} />
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path='/register' element ={<CreateUser />} />
              </Route>
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
