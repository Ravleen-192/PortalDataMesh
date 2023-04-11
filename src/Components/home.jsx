import React, { useState, useEffect } from "react";
import "../bootstrap.min.css";
import "../App.css";
import lpimage2 from "../resources/lp_search.jpg"
//import lpimage2 from "../images/Landing1.png";
import { Auth } from "aws-amplify";
import { showError } from "../App";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation } from 'react-router-dom';
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
const Home = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleforgotPwd = (event) => {
   
   navigate("/forgotpassword")
    
        props.setOnLoad(true);
        props.clearInputs();
  };
  const handleSignIn = (event) => {
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
      .then((user) => {
        console.log("1", user);
        props.setUser(user);
       
        navigate("/dataproducts")
       
        props.setOnLoad(true);
      })
      .then(() => {
        navigate("/dataproducts")
        
      })
      .catch((err) => {
        if (err.code == "UserNotConfirmedException") {
          navigate("/home")
        } else {
          if (err && err.message) {
            showError(err.message);
          }
        }
        props.setOnLoad(true);
        console.log("2", err);
      });
  };

  const { username, password } = props.inputs;

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>> RAVLEEN");
    console.log(props["user"]?.email);
    setUser(props["user"]?.email);
  }, [props["user"]?.email]);

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>> USEECT");
  }, [user]);

  console.log("USERNAME HOME", user);
  return (
    <section>
      {user !== undefined && user !== null ? (
      navigate("/dataproducts")
      ) : (
        <div className="landingpage">
          <div className="landingpageimage">
            <img className="img" src={lpimage2} alt="data search" />
          </div>
          <div className="landingpagetext">
            <h1>Value to your organization.</h1>
            <br />
            <h4>
              Bring in your domain data as a product <br />into the Mesh, 
              unleash rapid experimentation <br />
              and next-gen analytics.
            </h4>
            <br />
            <h2>
              <strong>Sign in with your Theia ID </strong></h2><br /> 
              <small>Browse, Manage, Publish and Consume latest Data Products.
             
            </small>

            <div>
              <FormControl
                className="new-line"
                sx={{ m: 1, width: "40ch" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  onChange={(event) => props.handleFormInput(event)}
                  name="username"
                  value={username}
                  label="Email"
                />
              </FormControl>
              <FormControl
                className="new-line"
                sx={{ m: 1, width: "40ch" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => props.handleFormInput(event)}
                  name="password"
                  value={password}
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
                  label="Password"
                />
              </FormControl>

              <FormControl
                className="new-line"
                sx={{ m: 1, width: "40ch" }}
                variant="outlined"
              >
                <button onClick={handleSignIn} className="frmbtn">
                  Sign In
                </button>
              </FormControl>
              <FormControl
                className="new-line"
                sx={{ m: 1, width: "40ch" }}
                variant="outlined"
              >
                <h6 onClick={handleforgotPwd}>Forgot your password?</h6>
              </FormControl>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </section>
  );
};

export default Home;
