import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import logo from '../resources/triadh_logo_small.png';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {useAuthenticator} from "@aws-amplify/ui-react"

import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:'rgb(25,118,210)'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

var prevPath = ''
var isPathSame = false
function checkAndSetPrevPath(currPath){
  if (prevPath === currPath){
    isPathSame = true
  } else{
    isPathSame = false
    prevPath = currPath
  }
}

export function getPathSameStatus(){
  return isPathSame
}

const ResponsiveAppBar = () => {

  //const pages = ['Data Products', 'Publish', 'Consume','Search','Learn'];
const pages = [
  { NameStr:'Data Products', Path:'/dataproducts'},
  { NameStr:'Publish', Path:'/dppublish'},
  { NameStr:'Platform Services',  Path:'/dpplatformservices'},
  { NameStr:'Governance', Path:'/DPGovernance'},
];

const location = useLocation();
const currentPath = () => {
  let path = location.pathname;
  if (path === "/") return -1;
  //else if (path === "/dpgrid") return 0;
  else if (path === "/dataproducts") return 0;
  else if (path === "/dppublish") return 1;
  else if (path === "/dpplatformservices") return 2;
  else if (path === "/DPGovernance") return 3;
};  
useEffect(() => {
  //console.log("page changed---------")
  checkAndSetPrevPath(location.pathname)
  setActiveMenu(currentPath())
}, [location]);

const displayProfile = () =>{
  //console.log("display profile")
  alert("Coming soon !!!")
}
const displayAccount = () =>{
  //console.log("display account")
  alert("Coming soon !!!")
}
const displayDashboard = () =>{
  //console.log("display dashboard")
  alert("Coming soon !!!")
}

const {route, authStatus, signOut} = useAuthenticator(context =>[
  context.route,
  context.authStatus,
  context.signOut
]);

const navigate = useNavigate();
//const location = useLocation();
const logout = () =>{
  if (authStatus === 'authenticated') {
    //console.log("logout")
    signOut();
    navigate("/",false)
  }else{
    //console.log("login")
    navigate("/login",false)
    
  }
}
  //const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const settings = [
    { NameStr:'Profile', Handler:displayProfile},
    { NameStr:'Account',  Handler:displayAccount},
    { NameStr:'Dashboard', Handler:displayDashboard},
    { NameStr:'Logout', Handler:logout}
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState(currentPath);

  const handleOpenNavMenu = (event) => {
    console.log ("handleOpenNavMenu", event)
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log ("handleOpenUserMenu", event)
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (index) => {
    setAnchorElNav(null);
    setActiveMenu(index)

  };

  const handleCloseUserMenu = ( handler) => {
    if (typeof( handler) == 'function')
      handler()
    setAnchorElUser(null);
  };

  const { user } = useAuthenticator((context) => [context.user]);
  useEffect(() => {
    //console.log(user)
  }, [user]);
  
  return (
    <AppBar position="static" sx={{boxShadow:'none',backgroundColor:'white',height:'40px',marginBottom:'5px'}}>
      <Container maxWidth="xl" sx={{backgroundColor:'white',boxShadow:'none'}}>
        <Toolbar disableGutters sx={{maxHeight:56,m:-1,color:'rgb(26, 26, 26)'}}>
          {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
          <img src={logo} alt="Triadh logo!" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,height:24,width:24 }} />
          <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Arial',
                fontSize:'16px',
                fontWeight: 'bold',
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                marginLeft:'10px'
              }}
          >
            HOME
          </Typography>
          
          {user !== undefined?<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',paddingLeft:'10px' } }}>
            {pages.map((page,index) => (
              <Button component={Link} to={page.Path} replace={false}
                key={index}
                onClick={()=>handleCloseNavMenu(index)}
                sx={{ my: 2, color:'black', display: 'block',fontSize:'15px',fontWeight:"bold",paddingTop:'2px',paddingBottom:'0px',
                      marginLeft:'5px',marginRight:'5px',
                      ...(index === activeMenu && {borderBottom:' 5px #37ABC8 solid', borderRadius:'0px'}),
                            ":hover":{backgroundColor:'#37ABC8',color:'white', borderRadius:'2px'} }}
              >
                {page.NameStr}
              </Button>
            ))}
          </Box>:<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',paddingLeft:'10px' } }}>
            {pages.map((page,index) => (
              <Button component={Link} to={page.Path} replace={false}
                key={index}
                onClick={()=>handleCloseNavMenu(index)}
                sx={{ my: 2, color:'black', display: 'block',fontSize:'15px',fontWeight:"bold",paddingTop:'2px',paddingBottom:'0px',
                      marginLeft:'5px',marginRight:'5px',
                      ...(index === activeMenu && {borderBottom:' 5px #37ABC8 solid', borderRadius:'0px'}),
                            ":hover":{backgroundColor:'#37ABC8',color:'white', borderRadius:'2px'} }}
              >
                
              </Button>
            ))}
          </Box>}
          {/*
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          */}
          {
            user !== undefined &&
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Arial',
                  fontSize:'14px',
                  fontWeight: 'bold',
                  letterSpacing: '.05rem',
                  color: 'gray',
                  textDecoration: 'none',
                  marginLeft:'10px'
                }}
            >
              {user["attributes"]["email"]}
            </Typography>
          }
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor:'transparent' }}>
                  <AccountCircleOutlinedIcon sx={{color:"#37ABC8",width: 36, height: 36 }}/>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                settings.map((setting,index) => {
                  
                  if (index !== 3)  {
                    return(
                        <MenuItem key={setting.NameStr} onClick={() => handleCloseUserMenu(setting.Handler)}>
                          <Typography textAlign="center">{setting.NameStr}</Typography>
                        </MenuItem>
                    );
                  } else {
                    if (authStatus === 'authenticated') {
                      return(
                        <MenuItem key={setting.NameStr} onClick={() => handleCloseUserMenu(setting.Handler)}>
                          <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                      );
                    } else {
                      return(
                        <MenuItem key={setting.NameStr} onClick={() => handleCloseUserMenu(setting.Handler)}>
                          <Typography textAlign="center">Login</Typography>
                        </MenuItem>
                      );
                    }
                  }

                }
                )
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
