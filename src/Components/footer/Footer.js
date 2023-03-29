import React from 'react'

import '../../App.css'

import {
  Col
} from 'reactstrap';

function Footer() {
  var year = new Date().getFullYear();
  const newTab = (linkedin) => {
    console.log("Newtab")
    var url = linkedin ? "https://www.linkedin.com/company/triadh-ai/?viewAsMember=true" : " https://www.instagram.com/triadhai/";
    window.open(url, "_blank");
  }

    return (
      <footer className="footer">
            <Col className="row">
              <Col className="" md="12" sm="12" xs="12" lg="12" xl="12">
                <Col md="12" sm="12" xs="12" lg="12" xl="12" className="text-center">
                  <Col className="footer-text">
                    <ul className="footer-ul">
                      <li className="list-inline-item">
                        <a className="social-icon link" onClick={() => {var url = "https://www.linkedin.com/company/triadh-ai/?viewAsMember=true" ;
                           window.open(url, "_blank");}}>
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                      {/* <li className="list-inline-item">
                  <a className="social-icon" target="_blank" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li> */}
                      <li className="list-inline-item">
                        <a className="social-icon link" onClick={() => {var url = " https://www.instagram.com/triadhai/" ;
                           window.open(url, "_blank");}}>
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <p>© {year} Triadh</p>
                      </li>
                    </ul>
                  </Col>
                </Col>
              </Col>
            </Col>
          </footer>
    );
  }
  
  export default Footer;
  