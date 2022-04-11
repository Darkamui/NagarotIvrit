import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function EditProject() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		tags: {},
	});

	// To link project to a user
	const auth = getAuth();
	const navigate = useNavigate();
	const { state } = useLocation();

	// On form submition
	const onSubmit = async (e) => {
		e.preventDefault();
		// Set loading to true while form in treatement
		setLoading(true);
		// Get all images from firestore
		const imagesRef = collection(db, "images");
		const imagesSnap = await getDocs(imagesRef);
		let fbImages = [];
		imagesSnap.forEach((doc) => {
			return fbImages.push({
				id: doc.id,
				data: doc.data(),
			});
		});
		// Loop through firestore and state images
		// If url match, get doc ref by id and update
		state.images.forEach(async (image) => {
			fbImages.forEach(async (fbImage) => {
				if (fbImage.data.url === image.data.url) {
					const tempRef = doc(db, "images", fbImage.id);
					console.log(image.data.url);
					console.log(fbImage.data.url);
					/* eslint-disable */
					const attempt = await updateDoc(tempRef, {
						tags: image.data.tags,
					});
				}
			});
		});
		toast.success("Project edited successfully!");
		navigate(`/yogibear`);
	};
	const onMutate = (e) => {
		// Add tag to array on change
		state.images.forEach((image) => {
			if (image.data.url === e.target.id) {
				if (!image.data.tags.includes(e.target.value)) {
					image.data.tags.push(e.target.value);
				}
				e.target.disabled = true;
			}
		});
	};
	// For memory leak warning
	const isMounted = useRef(true);
	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, (user) => {
				setFormData({ ...formData, userRef: user.uid });
			});
		} else {
			navigate("/sign-in");
		}
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="createProjectContainer">
				<div className="createProjectContentContainer">
					<header>
						<p className="pageHeader">
							{state.name}
							<br />
							Reset project image tags
						</p>
					</header>
					<main>
						<form onSubmit={onSubmit}>
							<div className="editProjectForm">
								{state.images.map((image, index) => (
									<div className="editProjectItem">
										<img src={image.data.url} alt="" />

										<select
											id={`${image.data.url}`}
											onChange={onMutate}
											required
										>
											<option selected disabled value="">
												Choose tag..
											</option>
											<option value="bathroom">Bathroom</option>
											<option value="kitchen">Kitchen</option>
											<option value="library">Library</option>
											<option value="other">Other</option>
										</select>
										<select id={`${image.data.url}`} onChange={onMutate}>
											<option selected disabled value="">
												Choose tag..
											</option>
											<option value="bathroom">Bathroom</option>
											<option value="kitchen">Kitchen</option>
											<option value="library">Library</option>
											<option value="other">Other</option>
										</select>
									</div>
								))}
							</div>
							<button
								type="submit"
								className="primary-button createListingButton"
							>
								Submit Project
							</button>
						</form>
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default EditProject;
