import React from "react";
import AboutUs from "../components/AboutUs";
import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Header from "../components/Header";
import OurServices from "../components/OurServices";
import OurWorks from "../components/OurWorks";

const Home = () => {
	return (
		<div>
			<Header />
			<OurServices />
			<AboutUs />
			<OurWorks />
			<Clients />
			<Footer />
		</div>
	);
};

export default Home;
