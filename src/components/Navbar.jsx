import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
function Navbar() {
	return (
		<nav>
			<div className="navSocialContainer">
				<Link to="/admin" className="navLink">
					<i className="fab fa-facebook"></i>
				</Link>
				<Link to="/" className="navLink">
					<i className="fab fa-twitter"></i>
				</Link>
				<Link to="/" className="navLink">
					<i className="fab fa-youtube"></i>
				</Link>
				<Link to="/" className="navLink">
					<i className="fab fa-instagram"></i>
				</Link>
			</div>
			<div className="navLinksContainer">
				<li>
					<Link to="/" className="navLink">
						בית
					</Link>
				</li>
				<li>
					<Link to="/about" className="navLink">
						אודות
					</Link>
				</li>
				<li>
					<Link to="/projects" className="navLink">
						פרוייקטים
					</Link>
				</li>
				<li>
					<Link to="/contact" className="navLink">
						צור קשר
					</Link>
				</li>
			</div>
			<div className="navLogoContainer">
				<img src={logo} className="navLogo" alt="" />
			</div>
		</nav>
	);
}

export default Navbar;
