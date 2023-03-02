import React from "react";
import lpimage1 from "./resources/lp_photo.jpg"
import lpimage2 from "./resources/lp_search.jpg"

const Footer = () => (
	<footer className="footer1">
	  <p className="text">'innovate, invent, transform'</p>
	</footer>
  );
const LandingPage = () => {
	return (
		<div className="landingpage">
			<div className="landingpagetext">
				<h2>
				  Value to your organization.
				</h2>
				<h3>
				  Bring in your domain data as a product into the Mesh and unleash rapid experimentation and next-gen analytics.
				</h3>
				<h3>
				  Explore Data Products.
				</h3>
			</div>
			<div className="landingpageimage">
				<img className="img" src={lpimage2} alt="data search" />
			</div>
			<Footer/>
		</div>
	);
};
	
export default LandingPage;