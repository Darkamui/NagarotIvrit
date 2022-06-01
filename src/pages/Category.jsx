import React, { useEffect, useState } from "react";
// Used to get value from url
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
function Category() {
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
				setLoading(true);
				// Get images with tag
				const listingsRef = collection(db, "images");
				const qImages = query(
					listingsRef,
					where("tags", "array-contains", params.categoryName),
					orderBy("timestamp", "desc")
				);
				const querySnap = await getDocs(qImages);
				let images = [];
				querySnap.forEach((doc) => {
					return images.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				// Get project ids from images
				let projectIds = [];
				images.forEach((image) => {
					projectIds.push(image.data.projectRef);
				});
				// Filter duplicates
				projectIds = projectIds.filter(
					(item, index) => projectIds.indexOf(item) === index
				);
				// Get all projects then filter with Id
				let projectsA = [];
				const projectsRef = collection(db, "Projects");
				let projectys = [];
				const docSnap = await getDocs(projectsRef);
				docSnap.forEach((doc) => {
					return projectys.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				projectys.forEach((doc) => {
					projectIds.forEach((project) => {
						if (project === doc.data.name) {
							projectsA.push(doc);
						}
					});
				});

				setProjects(projectsA);
				setImages(images);
				setLoading(false);
			} catch (error) {
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
					<main className="catHeight fade-in">
						<p className="catTitle">{params.categoryName}</p>
						<div className="categoryContainer">
							{
								//For each listing, send data and id to render item
								projects.map((project, index) => (
									<ProjectCard
										key={index}
										project={project}
										images={images}
										categoryName={params.categoryName}
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

export default Category;
