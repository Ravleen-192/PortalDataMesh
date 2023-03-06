import React from "react";
import lpimage1 from "../resources/lp_photo.jpg"
import lpimage2 from "../resources/dataanalytics.png"

const Footer = () => (
	<footer className="footer1">
	  <p className="text">'innovate, invent, transform'</p>
	</footer>
  );
const Home = (props) => {
	const tempuserName =props.userName.split('@')[0];
	const userName= tempuserName.charAt(0).toUpperCase() + tempuserName.slice(1);
	return (
		<div className="homepage">
			<div className="homepagetext">
				<h1>
				  Hello, {userName}
				</h1>
				<h2>
				 Welcome to DataMesh!
				</h2>
				<h3>
				  Bring in your domain data as a product into the Mesh and unleash rapid experimentation and next-gen analytics.
				</h3>
				<h3>
				  Explore Data Products.
				</h3>
			</div>
			<div className="homepageimage">
				<img className="img" src={lpimage2} alt="data search" />
			</div>
			<Footer/>
		</div>
	);
};
	
export default Home;