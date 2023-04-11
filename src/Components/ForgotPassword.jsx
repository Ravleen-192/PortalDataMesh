import React, { useState, useEffect } from "react";
import "../bootstrap.min.css";
import "../App.css";
import lpimage2 from "../resources/lp_search.jpg";
//import lpimage2 from "../images/Landing1.png";
import { Auth } from "aws-amplify";
import { showError } from "../App";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
/*const divStyle = {
  backgroundposition: "50% 0",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  opacity:1,
  //backgroundImage: `url(${homeimg})`,
};*/
const Footer = () => (
  <footer className="footer1">
    <p className="text">'innovate, invent, transform'</p>
  </footer>
);
const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return email.length > 0;
  }

  function validateResetForm() {
    return (
      code.length > 0 && password.length > 0 && password === confirmPassword
    );
  }
  async function alreadyHaveCode(event) {
    event.preventDefault();
    if(!email)
    {
      showError("Email required!")
      return;
    }
    setIsSendingCode(true);
      setCodeSent(true);
  
  }
  async function handleSendCodeClick(event) {
    event.preventDefault();
    if(!email)
    {
      showError("Email required!")
      return;
    }
    console.log("email", email);

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(email);
      setCodeSent(true);
    } catch (error) {
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();
    if(!email)
    {
      showError("Email required!")
      return;
    }
    if(!code)
    {
      showError("Code required!")
      return;
    }
    if(password !== confirmPassword)
    {
      showError("Password does not match!")
      return;
    }
    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      setConfirmed(true);
    } catch (error) {

      setIsConfirming(false);
    }
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleforgotPwd = (event) => {
    navigate("/home");
    props.setOnLoad(true);
    props.clearInputs();
  };
  const handleSignIn = (event) => {
    event.preventDefault();
    navigate("/home");
    props.setOnLoad(true);
    props.clearInputs();
   
  };
 
  function renderRequestCodeForm() {
    return (
      <form onSubmit={handleSendCodeClick}>
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            value={email}
            label="Email"
          />
        </FormControl>
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <button onClick={handleSendCodeClick} className="frmbtn">
            Send Code
          </button>
          <br />
          <h6 onClick={alreadyHaveCode}>Have a code?</h6>
        </FormControl>
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <h6>Contact us to register with us!</h6>
        </FormControl>
        {/*} <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isSendingCode}
          disabled={!validateCodeForm()}
        >
          Send Confirmation
    </LoaderButton>*/}
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmClick}>
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-code">
            Verification Code
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            name="code"
            label="Verification Code"
          />
        </FormControl>
        <FormHelperText>
          Please check your email ({email}) for the confirmation code.
        </FormHelperText>

        <hr />
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label=" New Password"
          />
        </FormControl>
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            name="cpassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        {/*} <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isConfirming}
          disabled={!validateResetForm()}
        >
          Confirm
              </LoaderButton>*/}
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <button onClick={handleConfirmClick} className="frmbtn">
            Confirm
          </button>
        </FormControl>
        <FormControl
          className="new-line"
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
        >
          <h6>Contact us to register with us!</h6>
        </FormControl>
      </form>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className="success">
        <h1>Welcome back to Theia Datamesh Portal</h1>
            <br />
            <h4>
            Your password has been reset.<br />
              into the Mesh.
              <br />
        </h4>
        <br />
          <h6 onClick={handleforgotPwd}>
            Click here to login with your new credentials.
          </h6>
      
      </div>
    );
  }

  return (
    <section>
      <div className="landingpage">
        <div className="landingpageimage">
          <img className="img" src={lpimage2} alt="data search" />
        </div>
        <div className="landingpagetext">
        <h6 onClick={handleSignIn}>
            <strong>Sign in with the existing Theia ID </strong>
          </h6>
          <br />
        
         
          {!codeSent
            ?  <> <h1>Forgot your password?</h1>
            <br />
            <h4>
              We will help you regain access <br />
              into the Mesh.
              <br />
              Please enter your Theia ID.
            </h4>
            <br />{renderRequestCodeForm()} </>
            : !confirmed
            ?   <> <h1>Enter the verification code to proceed</h1>
            <br />
            <h4>
              Reset your password.
              <br />
             
            </h4>
            <br />{renderConfirmationForm()}</>
            : renderSuccessMessage()}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
