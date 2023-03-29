/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import lpimage2 from "../images/login.png";
import { Auth } from "aws-amplify";
import { showError } from '../App';

const Login = (props) => {    

    const handleSignIn = event => {
        event.preventDefault();
        const { username, password } = props.inputs;
        if (!username) {
            showError("User name Required");
            return;
        }
        if (!password) {
            showError("Password required");
            return;
        }
        props.setOnLoad(false);
        // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
        Auth.signIn({ username, password })
            .then(user => {
                console.log("1", user);
                props.setUser(user);
                props.switchComponent("Home");
                props.setOnLoad(true);
            })
            .then(() => {
                props.switchComponent("Home");
                props.setOnLoad(true);
                props.clearInputs();
            })
            .catch(err => {
                if (err.code == "UserNotConfirmedException") {
                    props.switchComponent("Verify")
                } else {
                    if (err && err.message) {
                        showError(err.message);
                    }
                }
                props.setOnLoad(true);
                console.log("2", err);
            }
            );
    };
    
        const { username, password } = props.inputs;
        return (
            <section>
                  
                <div className="landingpage">
                    <div className="landingpageimage">
                        <img className="img" src={lpimage2} alt="data search" />
                    </div>
                    <div className="landingpagetext">
                        <div>
                            <div><h6>We provide customized services and Data Products designed </h6><h6>to bring about a fast paced transformation to your business.</h6></div>
                            <fieldset className="new-line">
                                <div className="new-line"><input onChange={(event) => props.handleFormInput(event)} name="username" value={username} className="input mb_25" autoComplete="off" type="email" placeholder="Email"></input></div>
                            </fieldset>
                            <fieldset>
                                <div><input onChange={(event) => props.handleFormInput(event)} name="password" value={password} className="input mb_25" autoComplete="off" type="password" placeholder="Password"></input></div>
                            </fieldset>
                            <div >
                                <button onClick={handleSignIn} className="frmbtn">Sign In</button>
                            </div>
                            <div className="new-line">
                                <p color='#46e2cb'> forgot password?<a href="http:///" target="_blank" rel="noopener noreferrer">Contact us</a> </p>
                            </div>
                        </div>
                    </div>



                </div>
            </section >
        );
    }

export default Login;