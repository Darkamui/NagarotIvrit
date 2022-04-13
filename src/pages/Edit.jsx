import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function Edit() {
	// To link project to a user
	const auth = getAuth();
	const navigate = useNavigate();
	const { state } = useLocation();

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: state.listing.data.name ? state.listing.data.name : "",
		date: state.listing.data.date ? state.listing.data.date : "",
		address: state.listing.data.address ? state.listing.data.address : "",
		description: state.listing.data.description
			? state.listing.data.description
			: "",
		isfeatured: state.listing.data.isfeatured
			? state.listing.data.isfeatured
			: "false",
	});
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	// On form submition
	const onSubmit = async (e) => {
		e.preventDefault();

		// Set loading to true while form in treatement
		setLoading(true);
		if (state.listing.data.name !== formData.name) {
			const imagesRef = collection(db, "images");
			const imageSnap = await getDocs(imagesRef);
			let images = [];
			imageSnap.forEach((doc) => {
				return images.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			images.forEach(async (image) => {
				if (image.data.projectRef === state.listing.data.name) {
					const iRef = doc(db, "images", image.id);
					// eslint-disable-next-line
					const attempt = await updateDoc(iRef, {
						projectRef: formData.name,
					});
				}
			});
		}
		// Get all images from firestore
		const tempRef = doc(db, "Projects", state.listing.id);
		// eslint-disable-next-line
		const attempt = await updateDoc(tempRef, {
			name: formData.name,
			date: formData.date,
			address: formData.address,
			description: formData.description,
			isfeatured: formData.isfeatured,
		});

		toast.success("Project edited successfully!");
		navigate(`/yogibear`);
	};
	// const onMutate = (e) => {
	// 	// Add tag to array on change

	// };
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
						<p className="pageHeader">Edit {state.listing.data.name}</p>
					</header>
					<main>
						<form onSubmit={onSubmit}>
							<label className="formLabel">Name</label>
							<input
								className="formInputName"
								type="text"
								id="name"
								defaultValue={formData.name}
								maxLength="60"
								minLength="5"
								onChange={(e) => onChange(e)}
								required
							/>
							<select
								id="isfeatured"
								onChange={(e) => onChange(e)}
								required
								className="formInputName"
							>
								<option selected disabled value="" className="formInputName">
									Is featured ?
								</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
							<label className="formLabel">Date (optional)</label>
							<input
								className="formInputName"
								type="text"
								id="date"
								defaultValue={formData.date}
								maxLength="60"
								onChange={onChange}
								minLength="5"
							/>

							<label className="formLabel">Address (optional)</label>
							<input
								className="formInputName"
								type="text"
								id="address"
								maxLength="100"
								onChange={onChange}
								defaultValue={formData.address}
								minLength="5"
							/>

							<label className="formLabel">Description (optional)</label>
							<textarea
								className="formInputAddress"
								type="text"
								onChange={onChange}
								id="description"
								defaultValue={formData.description}
							/>
							<button
								type="submit"
								className="primary-button createListingButton"
							>
								Update Project
							</button>
						</form>
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Edit;
