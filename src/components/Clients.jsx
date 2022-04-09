import React from "react";
import client1 from "../img/client1.jpg";
import client2 from "../img/client2.jpg";
const Clients = () => {
	return (
		<section className="clients__section">
			<div
				className="box"
				// data-aos="flip-left" data-aos-duration="1500"
			>
				<div className="item">
					<div className="img-box">
						<img src={client1} alt="" className="box-img" />
					</div>
					<div className="detail-box">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam
						</p>
						<h6>Klark Smith</h6>
						<p>magna aliqua</p>
					</div>
				</div>
				<div className="item">
					<div className="img-box">
						<img src={client2} alt="" className="box-img" />
					</div>
					<div className="detail-box">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam
						</p>
						<h6>Klark Smith</h6>
						<p>magna aliqua</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Clients;
