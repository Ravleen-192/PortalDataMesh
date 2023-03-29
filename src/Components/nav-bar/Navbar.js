import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import logo from '../../triadh_logo_small.png';
//import './Navbar.styles.css'
import '../../App.css'


function Navigate() {
    const [click, setClick] = useState(false);
    const [tmClick, settmClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const handletmClose = () => { settmClick(false); }
    const handletmClick = () => {

        settmClick(!tmClick);
        setClick(false);
    }
    const handleSignin = () => {
        var url = "https://master.d36f8cafq27e48.amplifyapp.com/";
        window.open(url, "_blank");
    }
    const closeMobileMenu = () => { setClick(false); settmClick(false); }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

    
    return (
        <> 
            <div>
                <nav className='navbar' >
                    <div className='navbar-container'>
                        <Link to="/" className='navbar-logo nav-item' onClick={closeMobileMenu}>

                            <img
                                src={logo}
                                alt="Triadh"
                            />
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            <i className={click ? "fas fa-times" : "fas fa-bars"} />
                        </div>
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item">
                                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className="nav-links" onClick={closeMobileMenu}>
                                    SignIn
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/Reg" className="nav-links" onClick={closeMobileMenu}>
                                    SignUp
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/dataproducts"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    DataProducts
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/dpplatformservices"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Platform Services 
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/dpgovernance"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Governance 
                                </Link>
                            </li>
                            <button className="frmbtn2">
                                <Link
                                    

                                    onClick={closeMobileMenu}
                                >
                                    SignOut
                                </Link>
                            </button>

                        </ul>


                    </div>
                </nav>
            </div>

        </>
    )
}

export default Navigate