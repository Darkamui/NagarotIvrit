import React, { useEffect, useRef } from "react";
import vid from "../img/carpenter-about.mp4";
import contact from "../img/contact.png";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
const Contact = () => {
	mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
	const mapContainer = useRef(null);
	const map = useRef(null);
	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [34.749469152928945, 31.886363472344783],
			zoom: 15,
		});
		/* eslint-disable */
		let marker1 = new mapboxgl.Marker()
			.setLngLat([34.749469152928945, 31.886363472344783])
			.addTo(map.current);
	});
	return (
		<>
			<section className="contact__page">
				<video
					id="background-video"
					className="fade-in"
					poster={contact}
					autoPlay
					loop
					muted
				>
					<source src={vid} type="video/mp4" />
				</video>

				<div className="contact__container slit-in-vertical">
					<h1>צרו איתנו קשר!</h1>
					<div className="flex">
						<div className="contact_form">
							<form action="#">
								<label htmlFor="fname">שם</label>
								<input
									type="text"
									id="fname"
									name="firstname"
									placeholder="שם"
								/>

								<label htmlFor="lname">טלפון</label>
								<input
									type="text"
									id="lname"
									name="lastname"
									placeholder="טלפון"
								/>

								<label htmlFor="country">Country</label>

								<label htmlFor="subject">Subject</label>
								<textarea
									id="subject"
									name="subject"
									placeholder="Write something.."
									rows="10"
								></textarea>

								<input type="submit" value="Submit" className="submit" />
							</form>
						</div>
						<div className="map__container">
							<div ref={mapContainer} id="map"></div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
