import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import RequireAuth from './Components/RequireAuth'
import LandingPage from './LandingPage'
import Login from './Components/Login'
import { Authenticator } from '@aws-amplify/ui-react';
import ResponsiveAppBar from "./Components/NavAppBar"
import DPPublish from './Components/DPPublish';
import DPGovernance from './Components/DPGovernance';
import DPPlatformServices from './Components/DPPlatformServices';
import DataProducts from './Components/DataProducts'

function App() {
  return (
    <div className="App">
        <Authenticator.Provider>
            <BrowserRouter>
            <ResponsiveAppBar/>
              <Routes>
                <Route path="/" element={<LandingPage />} />
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
