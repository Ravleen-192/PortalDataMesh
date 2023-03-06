import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import RequireAuth from './Components/RequireAuth'
import LandingPage from './LandingPage'
import Login from './Components/Login'
import { Authenticator } from '@aws-amplify/ui-react';
import ResponsiveAppBar from "./Components/NavAppBar"
import DPPublish from './Components/DPPublish';
import DPGovernance from './Components/DPGovernance';
import DPPlatformServices from './Components/DPPlatformServices';
import DataProducts from './Components/DataProducts';
import Home from './Components/home'

function App() {
  const [userName, setUserName] = useState("");
  const setLUserName = (value) => {
    console.log("set LUserName name called")
    setUserName(value);
  };
  return (
    <div className="App">
        <Authenticator.Provider>
            <BrowserRouter>
            <ResponsiveAppBar setLUserName={setLUserName} />
              <Routes>
                {userName?
                
                <Route path="/" element={<Home userName={userName}/>} />:  
                <Route path="/" element={<LandingPage />} />
                }
               
                <Route path="/dataproducts" element={
                    <RequireAuth>
                      <DataProducts/>
                    </RequireAuth>
                  } 
                />
                <Route path="/dppublish" element={
                    <RequireAuth>
                      <DPPublish/>
                    </RequireAuth>
                  } 
                />
                <Route path="/dpplatformservices" element={
                    <RequireAuth>
                      <DPPlatformServices/>
                    </RequireAuth>
                  } 
                />
                <Route path="/dpgovernance" element={
                    <RequireAuth>
                      <DPGovernance/>
                    </RequireAuth>
                  } 
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
        </Authenticator.Provider>
    </div>
  );
}

export default App;
