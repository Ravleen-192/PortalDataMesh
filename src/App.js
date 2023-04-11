/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Avatar, Divider, Hidden, Icon, IconButton, MenuItem, useMediaQuery } from '@mui/material';
import { Box, styled } from '@mui/system';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Link } from 'react-router-dom';
//import NotificationBar from './Components/NotificationBar';
import { Span } from './Components/Typography';
import { node } from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Typography from '@mui/material/Typography';

import './App.css'
import logo from './resources/triadh_logo_small.png';
import { default as Home } from "./Components/home";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Col } from 'reactstrap';

import SignUp from "./Components/Reg";
import ForgotPassword from "./Components/ForgotPassword";
import Senthil from './resources/face-6.jpg'
import { default as XMenu } from './Components/xMenu';
import { default as XSearchBox } from './Components/xSearchBox'


import { Auth } from "aws-amplify";
import { Amplify } from 'aws-amplify'
import config from './aws-exports';
import Globals from './Handlers/Globals';
import DataProducts from './Components/DataProducts';
import DPPublish from './Components/DPPublish';
import DPGovernance from './Components/DPGovernance';
import DPPlatformServices from './Components/DPPlatformServices';
import { Navigate } from 'react-router-dom';

import AlertComponent from './Handlers/AlertComponent';
Amplify.configure(config);
const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': { marginRight: '10px', color: 'black' },
}));

var mContext;
class App extends Component {
    constructor() {
        super();
      
        this.state = {
            isOpen: false,
            isBackButtonClicked: false,
            child: node,
            username: "", email: "", password: "",
            phone_number: "", address: "", address2: "", st: "", zip: "", city: "",
            code: "",
            user: null, // will contain our user data object when signed in
            status: "Home", loaded: true, hasError: false, type: "", message: "",
            noti_open: false, user_open: false,
            signout : false,
           
        };
        mContext = this;
        this.toggle = this.toggle.bind(this);
        this.setOnLoad = this.setOnLoad.bind(this);
        //this.onHidden = this.onHidden.bind(this);
    }

    componentWillMount() {

    }
    componentDidMount() {
        this.setOnLoad(true);

        //console.log("ComponentDIDOUNT", this.state.user)
        Auth.currentAuthenticatedUser({
            bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
            .then(data => {
                let user = { username: data.username, ...data.attributes }
                this.setUser(user);
                //console.log(user);
            })
            .catch(err => {
                this.setOnLoad(true);
                //console.log(err)
            }
            );
    }
    handlesignOut = event => {
        
        try {
            this.setOnLoad(false);
            Auth.signOut();
            this.setUser(null);
            this.setState({signout: true});
            this.setOnLoad(true);
        } catch (error) {
            this.setOnLoad(true);
            //console.log('error signing out: ', error);
        }
    };
    handleFormInput = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });

    };
    setMenuActive(source, key) {
        let { links, DPLinks } = this.state;
        switch (source) {
            case "Landing":
                links.map((element, index) => {
                    element.isActive = index == key ? true : false;
                });
                this.setState({ links });
                break;

            case "dpmenu":
                DPLinks.map((element, index) => {
                    element.isActive = index == key ? true : false;
                });
                this.setState({ DPLinks });
                break;
            default:
                break;
        }
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    closeNavbar() {
        if (this.state.isOpen == true) {
            this.toggle();
        }
    }
    setOnLoad(source) {
        this.setState({ loaded: source });
    }
    setUser(user) {
        mContext.setState({ user: user });
    }
    onHidden(hidden) {
        mContext.setState({ hasError: hidden.hasError });
    }
    clearInputs() {
        mContext.setState({ email: "", password: "", address: "", address2: "", st: "", city: "", phone_number: "" })
    }
    scroll(container, key, loop = false) {
        var element = document.getElementById(container);
        if (loop && this.state.mouseout) {
            return;
        }
        if (element) {
            var scroll_height = element.scrollTop;
            switch (key) {
                case "top":
                    if (scroll_height > 0) {
                        scroll_height -= 10;
                        element.scrollTop = scroll_height;
                        window.setTimeout(() => { this.scroll(container, key, true) }, 100);
                    }
                    break;
                case "bottom":
                    var scrollable_height = scroll_height + element.clientHeight;
                    if (scrollable_height < element.scrollHeight) {
                        scroll_height += 10;
                        element.scrollTop = scroll_height;
                        window.setTimeout(() => { this.scroll(container, key, true) }, 100);
                    }
                    break;

                default:
                    break;
            }
        }
    }
    toggleNavMenu(nav_item) {
        const { noti_open, user_open } = this.state;
        switch (nav_item) {
            case "noti":
                this.setState({ theam_open: false, fav_open: false, noti_open: !noti_open, other_noti_open: false, user_open: false });
                break;
            case "user":
                this.setState({ theam_open: false, fav_open: false, noti_open: false, other_noti_open: false, user_open: !user_open });
                break;
            default:
                this.setState({ noti_open: false, user_open: false });
                break;
        }
    }

    render() {
        let { signout, type, message, hasError, user, noti_open, user_open, DPLinks, links } = this.state;
        //console.log("AAAAAAAAAA", user)
        return (
            <section>
                {signout &&
                    <Navigate to="/home" />
                }
                {!user ? <><Navbar dark expand="md" sticky={'top'} className="navbar-header">

                <NavbarBrand href="Home"><img className="banner-img" src={logo} alt="logo" /></ NavbarBrand>
                <h3>Theia Data Mesh Portal</h3>
                    
                </Navbar> </> :
                    <><Navbar dark expand="md" sticky={'top'} className="navbar-header">

                        <NavbarBrand href="Home"><h3>Theia Data Mesh Portal</h3></NavbarBrand>

                     
                <Box>
                           
                            <XMenu  sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Arial',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    letterSpacing: '.05rem',
                                    color: 'gray',
                                    textDecoration: 'none',
                                    marginLeft: '10px'
                                }}
                                menuButton={
                                    <UserMenu>
                                        <Hidden xsDown>
                                            <Span className="content">
                                                {"Senthil Kumar"}
                                            </Span>
                                        </Hidden>
                                        <Avatar src={Senthil} sx={{ cursor: 'pointer' }} />
                                    </UserMenu>
                                }
                            >
                                <StyledItem>
                                    <HomeOutlinedIcon />

                                    <Span> Home </Span>

                                </StyledItem>

                                <StyledItem>
                                    <AccountCircleOutlinedIcon />
                                    <Span> Profile </Span>

                                </StyledItem>

                                <StyledItem>
                                    <SettingsApplicationsOutlinedIcon />
                                    <Span> Settings </Span>
                                </StyledItem>

                                <StyledItem onClick={this.handlesignOut}>
                                    <PowerSettingsNewOutlinedIcon />
                                    <Span> Logout </Span>
                                </StyledItem>
                            </XMenu>
                            <XSearchBox />
                            <IconButton
                                className="closeicon"
                                size="small"
                                sx={{
                                    width: "50px",
                                    height: "50px",
                                    marginLeft: "5px",
                                    marginTop: "2px",
                                    backgroundColor: "rgb(226, 222, 222)",
                                    color: '#0D9F98',
                                }}

                            >

                                <HelpOutlineOutlinedIcon />

                            </IconButton>

                     
                        
                        </Box>
                        
                    </Navbar></>}
                   
                <section>
                    {hasError && <Col>
                        <AlertComponent
                            onHidden={this.onHidden}
                            type={type}
                            message={message}
                        />
                    </Col>}
                </section>
                
               
                        <Routes>
                            <Route path="/" element={

                                <Home  inputs={this.state}
                                user={user}
                                setUser={this.setUser}
                                handleFormInput={this.handleFormInput}
                                setOnLoad={this.setOnLoad}
                                clearInputs={this.clearInputs} />

                            } />
                           
                            <Route path="/home" element={

                                <Home  inputs={this.state}
                                user={user}
                                setUser={this.setUser}
                                handleFormInput={this.handleFormInput}
                                setOnLoad={this.setOnLoad}
                                clearInputs={this.clearInputs}/>

                            } />
                    <Route path="/forgotpassword" element={

                        <ForgotPassword  user={user}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}/>

                            } />

                            <Route path="/dataproducts" element={

                                <DataProducts  inputs={this.state}
                                user={user}
                                setUser={this.setUser}
                                handleFormInput={this.handleFormInput}
                                setOnLoad={this.setOnLoad}
                                clearInputs={this.clearInputs}/>

                            }
                            />
                            <Route path="/dppublish" element={

                                <DPPublish user={user} />

                            }
                            />
                            <Route path="/dpplatformservices" element={

                                <DPPlatformServices />

                            }
                            />
                            <Route path="/dpgovernance" element={

                                <DPGovernance />

                            }
                            />

                        </Routes>

            </section>
        );
    }
}
export const showSuccess = (message) => {
    if (!mContext) {
        return;
    }
    if (message && typeof (message) == 'string') {
        mContext.setState({ type: Globals.SUCCESS, message: message, hasError: true });
        setTimer(Globals.SUCCESS);
    } else {
        mContext.setState({ hasError: false });
    }
}

export const showError = (message) => {
    if (!mContext) {
        return;
    }
    if (message && typeof (message) == 'string') {
        mContext.setState({ type: Globals.DANGER, message: message, hasError: true });
        setTimer(Globals.DANGER);
    } else {
        mContext.setState({ hasError: false });
    }
}

export const showInfo = (message) => {
    if (!mContext) {
        return;
    }
    if (message) {
        mContext.setState({ type: Globals.INFO, message: message, hasError: true });
        setTimer(Globals.INFO);
    } else {
        mContext.setState({ hasError: false });
    }
}
const setTimer = (type) => {
    if (mContext.timerHandle) { return; }
    // Remember the timer handle
    mContext.timerHandle = setTimeout(() => {
        mContext.setState({ hasError: false });
        mContext.timerHandle = 0;
    }, type == Globals.DANGER ? 20000 : 2000);
}
export default App;