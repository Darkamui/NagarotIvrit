import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
const Footer = () => {
	return (
		<footer className="footer__section">
			<div className="footer__section-container">
				<div className="footer__copyright-container">
					<Link to="/contact">צור קשר</Link>
					<h5>©2021-2022 כל הזכויות שמורות לנגרות עברית בע"מ</h5>
				</div>
				<div className="footer__logo-container">
					<img src={logo} alt="" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
