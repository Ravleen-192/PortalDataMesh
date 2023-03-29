/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Container, Form } from 'reactstrap';
import { Auth } from "aws-amplify";
import { showError } from '../App';
import lpimage2 from '../images/signup.png'
var validator = require("email-validator");

const Reg = (props) => {
  
 
  const handleSignUp= () => {
    const { username, email, password } =props.inputs;
   props.setOnLoad(false);
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .then(() => {
       props.switchComponent("Verify");
       props.setOnLoad(true);
       props.clearInputs();
      }) // switches Sign Up to Verification
      .catch(err => {
        console.log(err);
       props.setOnLoad(true);
        switch (err.code) {
          case "UsernameExistsException":
          case "InvalidParameterException":
           // this.setState({ isNextPage: false, isLastPage: false });
            break;
          default:
            break;
        }
        if (err && err.message) {
          showError(err.message);
        }
      })
  };

  const setOnClickSignUp = () => {
    const { username, email, password } =props.inputs;
    if (!username) {
      showError("User Name Required");
      return
    }
    if (!email) {
      showError("Email Required");
      return;
    }
    if (!validator.validate(email)) {
      showError("Please enter valid email");
      return;
    }
    if (username !== email) {
      showError("Username should be an email");
      return
    }
    if (!password) {
      showError("Password Required");
      return;
    }
    if (password.length < 6) {
      showError("Password must have length greater than or equal to 6");
      return;
    }
    //this.setState({ isNextPage: false });
    showError(null);
    window.scrollTo(0, 0);
    handleSignUp();
  }

 
    const { username, email, password } =props.inputs;
    return (
      <section>
        {/*} <div className="personalbg">
          <div className="centerdiv">
            <div >
              <h2>Join Us, Know Us and Let Others Know About US!</h2>
            </div>
            <fieldset>
              <div className="new-line" >
                <input onChange={(event) =>props.handleFormInput(event)} value={username} className="from-control input mb_25" name="username" autoComplete="off" type="text" placeholder="Email as username"></input>
              </div>
            </fieldset>
            <fieldset>
              <div >
                <input onChange={(event) =>props.handleFormInput(event)} value={email} className="from-control input mb_25" name="email" autoComplete="off" type="email" placeholder="Email"></input>
              </div>
              </fieldset>
              <fieldset>
                <div>
                  <input onChange={(event) =>props.handleFormInput(event)} value={password} className="from-control input mb_25" name="password" autoComplete="off" type="password" placeholder="Password"></input>
                </div>
              </fieldset>
              <div>
                <button className="frmbtn signup" onClick={() =>setOnClickSignUp()}>Sign Up</button>
              </div>
        </div>
    </div>*/}
        <div className="landingpage">
          <div className="landingpageimage">
            <img className="img" src={lpimage2} alt="data search" />
          </div>
          <div className="landingpagetext">
            <div>
              <div >
                <h2>Join the DataMesh, Get access to the data from related domains, enjoy the services and the data products!</h2>
              </div>
              <fieldset>
                <div className="new-line" >
                  <input onChange={(event) =>props.handleFormInput(event)} value={username} className="from-control input mb_25" name="username" autoComplete="off" type="text" placeholder="Email as username"></input>
                </div>
              </fieldset>
              <fieldset>
                <div >
                  <input onChange={(event) =>props.handleFormInput(event)} value={email} className="from-control input mb_25" name="email" autoComplete="off" type="email" placeholder="Email"></input>
                </div>
              </fieldset>
              <fieldset>
                <div>
                  <input onChange={(event) =>props.handleFormInput(event)} value={password} className="from-control input mb_25" name="password" autoComplete="off" type="password" placeholder="Password"></input>
                </div>
              </fieldset>
              <div>
                <button className="frmbtn signup" onClick={() =>setOnClickSignUp()}>Sign Up</button>
              </div>
            </div>
          </div>



        </div>
      </section>
    );
  }

export default Reg;