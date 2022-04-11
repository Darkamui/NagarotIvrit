import React, { useEffect, useState } from "react";
// Used to get value from url
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
function Projects() {
	// State for data
	const [images, setImages] = useState(null);
	const [projects, setProjects] = useState(null);
	// State for loading
	const [loading, setLoading] = useState(true);

	// Get params from url
	const params = useParams();

	useEffect(() => {
		// Async cannot be used on useEffect so function is made
		const fetchListings = async () => {
			try {
				// Get all projects then filter with Id
				let projects = [];
				const projectsRef = collection(db, "Projects");
				const docSnap = await getDocs(projectsRef);
				docSnap.forEach((doc) => {
					return projects.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setProjects(projects);
				// Get images with tag
				const listingsRef = collection(db, "images");
				const querySnap = await getDocs(listingsRef);
				let images = [];
				querySnap.forEach((doc) => {
					return images.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				projects.forEach((project) => {
					project.images = [];
					images.forEach((image) => {
						if (image.data.projectRef === project.data.name) {
							project.images.push(image.data.url);
						}
					});
				});
				console.log(images);

				setProjects(projects);
				console.log(projects);
				setImages(images);
				setLoading(false);
			} catch (error) {
				console.log(error);
				toast.error("Could not fetch data");
			}
		};
		// Call of the main async function
		fetchListings();
	}, [params.categoryName]);

	return (
		<div>
			{/* If loading display spinner, else if display listings or say no listings */}
			{loading ? (
				<Spinner />
			) : projects ? (
				<>
					<main className="catHeight">
						<p className="catTitle">Projects</p>
						<div className="categoryContainer">
							{
								//For each listing, send data and id to render item
								projects.map((project, index) => (
									<ProjectCard
										key={index}
										project={project}
										images={images}
										categoryName="projects"
									/>
								))
							}
						</div>
					</main>
					<Footer />
				</>
			) : (
				<p>No listings for {params.categoryName}</p>
			)}
		</div>
	);
}

export default Projects;
