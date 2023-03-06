// components/Login.js
import { useEffect } from "react";
import lpimage2 from "../resources/login.png"
import "../App.css"
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useNavigate, useLocation } from 'react-router';
const Footer = () => (
	<footer className="footer1">
	  <p className="text">'innovate, invent, transform'</p>
	</footer>
  );
export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <>
      
      <div className="loginpage">
			
			<div className="loginpageimage">
				<img className="img" src={lpimage2} alt="data search" />
			</div>
      <div className="loginpagetext">
	  <View className="auth-wrapper">
		<Authenticator></Authenticator>
	  </View>
			</div>
			<Footer/>
		</div>
     
    </>
  );
}