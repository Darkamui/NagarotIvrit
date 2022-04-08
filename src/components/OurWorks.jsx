import React, { useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const OurWorks = () => {
	const [projects, setProjects] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const projectsRef = collection(db, "Projects");
				const q = query(projectsRef, orderBy("timestamp", "desc"), limit(4));
				const querySnap = await getDocs(q);
				let projects = [];
				querySnap.forEach((doc) => {
					return projects.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				projects.images = [];
				console.log(projects);

				const imagesRef = collection(db, "images");
				const imageQ = query(imagesRef, orderBy("timestamp", "desc"));

				const imagesSnap = await getDocs(imageQ);
				const imgContain = [];
				imagesSnap.forEach((doc) => {
					return imgContain.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				projects.forEach((project) => {
					project.images = [];
					imgContain.forEach((img) => {
						if (project.data.name === img.data.projectRef) {
							project.images.push(img);
						}
					});
				});
				console.log(projects);
				setProjects(projects);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProjects();
	}, []);

	return (
		<section
			className="works__section"
			data-aos="fade-in"
			data-aos-duration="1000"
		>
			<div className="works__section-container">
				<h3>OUR WORKS</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi modi
					aliquid maiores incidunt similique. Quidem aliquid ducimus illum
					architecto amet assumenda exercitationem! Esse rerum asperiores natus
					vitae illum ullam dolores?
				</p>
				<div className="ourWorksContainer">
					{loading ? (
						<Spinner />
					) : (
						//For each listing, send data and id to render item
						projects.map((project, index) => (
							<div className="ourWorksItem" key={index}>
								<h3>{project.data.name}</h3>
								<Carousel
									dynamicHeight={true}
									autoPlay={true}
									showThumbs={false}
									showStatus={false}
									showIndicators={false}
									infiniteLoop={true}
								>
									{project.images.map((image, index) => (
										<div className="projectCardImgContainer" key={index}>
											<img src={image.data.url} alt="example" />
										</div>
									))}
								</Carousel>
							</div>
						))
					)}
				</div>
			</div>
		</section>
	);
};

export default OurWorks;
