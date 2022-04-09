import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../img/about-img.jpg";
const AboutUs = () => {
	return (
		<section
			className="about__section"
			// data-aos="zoom-in"
			// data-aos-duration="1500"
		>
			<div className="about__section-image_container">
				<img src={aboutImg} alt="" className="about__section-image" />
			</div>
			<div className="about__section-content_container">
				<h3>קצת אודותינו</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
					accusamus iure maiores ducimus minus hic deleniti natus? Porro
					voluptatibus maxime excepturi sunt similique architecto unde quis,
					ipsam nesciunt impedit alias?
				</p>
				<div className="about__section-link_container">
					<Link to="/about" className="about__section-button">
						קרא עוד
					</Link>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
