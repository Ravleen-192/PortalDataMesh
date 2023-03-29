/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Container} from 'reactstrap';
import { Auth } from "aws-amplify";
import { showError } from '../App';

const Verify =(props) => {
   
    
    const handleVerification = event => {
        event.preventDefault();
        const { username, code } =props.inputs;
        if(!code){
            showError("Verification Code Required");
            return;
        }
       props.setOnLoad(false);
        // After retrieveing the confirmation code from the user
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        })
        .then(data => console.log(data))
        .then(()=>{props.switchComponent("SignIn");
           props.clearInputs();
           props.setOnLoad(true);})
        .catch(err => {if(err&&err.message){
            showError(err.message);}props.setOnLoad(true);});
    };
   
        const { code} =props.inputs;
        return (
            <section>
                <div className="personalbg">
                        <div className="centerdiv">
                            <div>
                                <div ><h2>Email is not verifed.</h2></div>
                               <fieldset>
                                    <div className="new-line"> 
                                        <input onChange={(event)=>props.handleFormInput(event)} name="code" value={code} className="from-control input mb_25" autoComplete="off" type="text" placeholder="Verification Code"></input>
                                    </div>
                                </fieldset>
                                
                                <div >
                                <button onClick={handleVerification} className="frmbtn signup">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
           
        </section>
        );
    }

export default Verify;