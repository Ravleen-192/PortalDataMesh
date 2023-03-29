/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Avatar, Hidden, Icon, IconButton, MenuItem, useMediaQuery } from '@mui/material';
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
import logo from './resources/triadh_logo_full.png';
import { default as Home } from "./Components/home";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Col } from 'reactstrap';
import SignIn from "./Components/Login";
import SignUp from "./Components/Reg";
import Verify from "./Components/Verify";
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
            links: [
                { href: '#', text: 'Theia Data Mesh Portal', menuId: 0, source: "Home", isActive: true }],
            DPLinks: [
                { href: '#DataProducts', text: 'DataProducts', menuId: 1, source: "DataProducts", isActive: false },
                { href: '#DPPublish', text: 'Publish', menuId: 2, source: "DPPublish", isActive: false },
                { href: '#DPPlatformServices', text: 'Platform Services', menuId: 3, source: "DPPlatformServices", isActive: false },
                { href: '#DPGovernance', text: 'Governance', menuId: 4, source: "DPGovernance", isActive: false }
            ],
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

        console.log("ComponentDIDOUNT", this.state.user)
        Auth.currentAuthenticatedUser({
            bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
            .then(data => {
                let user = { username: data.username, ...data.attributes }
                this.setUser(user);
                console.log(user);
            })
            .catch(err => {
                this.setOnLoad(true);
                console.log(err)
            }
            );
    }
    handlesignOut = event => {
        try {
            this.setOnLoad(false);
            Auth.signOut();
            this.setUser(null);
            this.switchComponent("Home");
            this.setOnLoad(true);
        } catch (error) {
            this.setOnLoad(true);
            console.log('error signing out: ', error);
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
    }
    AuthComponent = () => {
        let { user } = this.state;

        console.log("AAAAAAAAAA", user)
        switch (this.state.status) {
            case "Home":
                if (!user) {
                    return (<Home
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        user={user}
                        setUser={this.setUser}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                    />
                    );
                }
                else
                    return (<DataProducts
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                        source={this.state.status}
                    />
                    );

            case "SignUp":
                return (
                    <SignUp
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                    />
                );
            case "Verify":
                return (
                    <Verify
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                    />
                );

            case "SignIn":
                return (
                    <SignIn
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                        setUser={this.setUser}
                    />
                );
            case "DataProducts":
                return (<DataProducts
                    switchComponent={this.switchComponent}
                    inputs={this.state}
                    handleFormInput={this.handleFormInput}
                    setOnLoad={this.setOnLoad}
                    clearInputs={this.clearInputs}
                    source={this.state.status}
                />
                );
            case "DPPublish":
                return (<DPPublish
                    switchComponent={this.switchComponent}
                    inputs={this.state}
                    user={user}
                    handleFormInput={this.handleFormInput}
                    setOnLoad={this.setOnLoad}
                    clearInputs={this.clearInputs}
                    source={this.state.status}
                />
                );

            case "DPPlatformServices":
                return (<DPPlatformServices
                    switchComponent={this.switchComponent}
                    inputs={this.state}
                    handleFormInput={this.handleFormInput}
                    setOnLoad={this.setOnLoad}
                    clearInputs={this.clearInputs}
                    source={this.state.status}
                />
                );
            case "DPGovernance":
                return (<DPGovernance
                    switchComponent={this.switchComponent}
                    inputs={this.state}
                    handleFormInput={this.handleFormInput}
                    setOnLoad={this.setOnLoad}
                    clearInputs={this.clearInputs}
                    source={this.state.status}
                />
                );
            default:
                break;

        }
    };
    switchComponent = status => {
        this.setState({ status });
        this.closeNavbar();
    };
    // onClickMenuItem(menuId){
    //   var Component = ImportComponent(menuId);
    //   this.setState({child:<Component.default 
    //     onClickMenuItem={this.onClickMenuItem}
    //   />});
    //   this.closeNavbar();
    // }
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
        let { type, message, hasError, user, noti_open, user_open, DPLinks, links } = this.state;
        console.log("AAAAAAAAAA", user)
        return (
            <section>

                {!user ? <><Navbar dark expand="md" sticky={'top'} className="navbar-header">

                    <a href="#"><img className="img img-responsive navbrand" src={logo} alt="logo" /></a>

                    {this.state.isOpen ?
                        <a onClick={this.toggle} type="button" className="navbar-toggle pull-right closebtn">X</a>
                        :
                        <NavbarToggler onClick={this.toggle} />
                    }
                    <h2 className="navbrand">Theia Data Mesh Portal</h2>

                    {/*} <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {links.map((element, key) => {
                                    return (
                                        <NavItem key={element.menuId} active={element.isActive}>
                                            <NavLink active={element.isActive} href={element.href} className={element.className}
                                                onClick={() => { mContext.switchComponent(element.source); this.setMenuActive("Landing", key) }}>{element.text}</NavLink>
                                        </NavItem>
                                    )
                                })}
                            </Nav>
                            </Collapse>*/}
                    
                </Navbar> </> :
                    <><Navbar dark expand="md" sticky={'top'} className="navbar-header">

                        <NavbarBrand href="#"><img className="img img-responsive navbrand" src={logo} alt="logo" /></NavbarBrand>

                        {this.state.isOpen ?
                            <a onClick={this.toggle} type="button" className="navbar-toggle pull-right closebtn">X</a>
                            :
                            <NavbarToggler onClick={this.toggle} />
                        }

                        {/* <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {DPLinks.map((element, key) => {
                                    return (
                                        <NavItem key={element.menuId} active={element.isActive}>
                                            <NavLink active={element.isActive} href={element.href} className={element.className}
                                                onClick={() => { mContext.switchComponent(element.source); this.setMenuActive("dpmenu", key) }}>{element.text}</NavLink>
                                        </NavItem>
                                    )
                                })}
                            
                                   
                                    <NavItem className={user_open ? "user user-menu open" : "user user-menu"} onClick={this.handlesignOut}>
                                        <a href="/" className=" frmbtn2">
                                            <span ><span >{"Sign Out"}</span></span>
                                        </a>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                            <Typography
                               
                                noWrap
                                component="a"
                                sx={{
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
                            >
                                {/*user.email
                                {"Senthil Kumar"}
                            </Typography>
                            
                <Avatar src={Senthil} sx={{ cursor: 'pointer', width: 36, height: 36 }} />*/}
                <Box>
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
                                            <Span>
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
                {/* <Router>
                        <Routes>
                            <Route path="/" element={

                                <Home user={user} />

                            } />
                           
                            <Route path="/Login" element={

                                <SignIn />

                            } />
                            <Route path="/Reg" element={

                                <SignUp />

                            } />

                            <Route path="/dataproducts" element={

                                <DataProducts />

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

                        </Router>*/}

                <div>{this.AuthComponent()}</div>

               

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