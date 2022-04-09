import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import bathroomsImg from "../img/services1.webp";
import kitchensImg from "../img/services2.webp";
import libraryImg from "../img/services3.webp";
const OurServices = () => {
	AOS.init();
	return (
		<section className="services__section">
			<h2>כותרת כלשהי משהו משהו</h2>
			<div className="services__container">
				<Link to="/category/bathroom" className="services__content-link">
					<div
						className="card"
						// data-aos="fade-left" data-aos-duration="1500"
					>
						<div className="services__image-container">
							<img src={bathroomsImg} alt="" />
						</div>
						<div className="services__content-container">
							<h3>ארונות אמבטיה</h3>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Officia impedit eaque odit excepturi nam provident possimus
								optio blanditiis labore nisi, accusamus laborum dolorem tenetur
								voluptate aut saepe reprehenderit? Enim, dolor.
							</p>
							<Link to="/category/bathroom" className="services__content-link">
								קרא עוד
							</Link>
						</div>
					</div>
				</Link>

				<Link to="/category/kitchen" className="services__content-link">
					<div
						className="card"
						// data-aos="fade-up"
						// data-aos-duration="1500"
						// data-aos-delay="150"
					>
						<div className="services__content-container">
							<h3>מטבחים</h3>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Officia impedit eaque odit excepturi nam provident possimus
								optio blanditiis labore nisi, accusamus laborum dolorem tenetur
								voluptate aut saepe reprehenderit? Enim, dolor.
							</p>
							<Link to="/category/kitchen" className="services__content-link">
								קרא עוד
							</Link>
						</div>
						<div className="services__image-container">
							<img src={kitchensImg} alt="" />
						</div>
					</div>
				</Link>

				<Link to="/category/library" className="services__content-link">
					<div
						className="card"
						// data-aos="fade-right"
						// data-aos-duration="1500"
						// data-aos-delay="300"
					>
						<div className="services__image-container">
							<img src={libraryImg} alt="" />
						</div>
						<div className="services__content-container">
							<h3>ארונות וספריות</h3>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Officia impedit eaque odit excepturi nam provident possimus
								optio blanditiis labore nisi, accusamus laborum dolorem tenetur
								voluptate aut saepe reprehenderit? Enim, dolor.
							</p>
							<Link to="/category/library" className="services__content-link">
								קרא עוד
							</Link>
						</div>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default OurServices;
