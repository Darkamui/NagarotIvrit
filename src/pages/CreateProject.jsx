import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import {
	addDoc,
	collection,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function CreateListing() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		date: "",
		name: "",
		address: "",
		description: "",
		imgUrls: {},
	});
	const { name, address, imgUrls, date, description } = formData;

	// To link project to a user
	const auth = getAuth();
	const navigate = useNavigate();
	// On form submition
	const onSubmit = async (e) => {
		e.preventDefault();
		// Set loading to true while form in treatement
		setLoading(true);

		// Function to store an image in Firebase storage
		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				// Create file name with user id, image name and uuid
				const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
				// Create a storage reference
				const storageRef = ref(storage, "nagarot/" + fileName);
				// Create upload task
				const uploadTask = uploadBytesResumable(storageRef, image);
				// Execute upload task
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log("Upload is " + progress + "% done");
						/* eslint-disable */
						switch (snapshot.state) {
							case "paused":
								console.log("Upload is paused");
								break;
							case "running":
								console.log("Upload is running");
								break;
						}
					},
					(error) => {
						reject(error);
					},
					() => {
						// If successful, resolve image url
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};
		// Loop through all images with storage function
		const imgUrlsCopy = await Promise.all(
			[...imgUrls].map((image) => storeImage(image))
		).catch(() => {
			setLoading(false);
			toast.error("Images not uploaded");
			return;
		});
		// Create document for each image url
		imgUrlsCopy.forEach(async (imgUrl) => {
			const imageData = {
				projectRef: name,
				url: imgUrl,
				tags: ["whatever"],
				timestamp: serverTimestamp(),
			};
			const imgUrlRef = await addDoc(collection(db, "images"), imageData);
		});
		// Get created documents ID
		const imagesRef = collection(db, "images");
		const qImages = query(
			imagesRef,
			where("projectRef", "==", name),
			orderBy("timestamp", "desc")
		);
		const querySnapImages = await getDocs(qImages);
		let images = [];
		querySnapImages.forEach((doc) => {
			return images.push({ id: doc.id, data: doc.data() });
		});
		let docIds = [];
		images.forEach((doc) => {
			docIds.push(doc.id);
		});
		// Finalize data to send to Firestore
		const formDataCopy = {
			...formData,
			imgUrls: docIds,
			coverImg: images[0].data.url,
			timestamp: serverTimestamp(),
		};

		// Send to database
		const docRef = await addDoc(collection(db, "Projects"), formDataCopy);
		setLoading(false);

		toast.success("Project added successfully!");
		// Redirect to listing created with type and new doc id
		navigate(`/edit-project/${name}`, {
			state: {
				images: images,
				name: name,
			},
		});
	};
	const onMutate = (e) => {
		// Add images to array
		if (e.target.files) {
			setFormData((prevState) => ({ ...prevState, imgUrls: e.target.files }));
		}
		// If not files, update form data with previous data and current data
		if (!e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}));
		}
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
						<p className="pageHeader">Create a project</p>
					</header>
					<main>
						<form onSubmit={onSubmit}>
							<label className="formLabel">Name</label>
							<input
								className="formInputName"
								type="text"
								id="name"
								value={name}
								onChange={onMutate}
								maxLength="60"
								minLength="5"
								required
							/>

							<label className="formLabel">Date (optional)</label>
							<input
								className="formInputName"
								type="text"
								id="date"
								value={date}
								onChange={onMutate}
								maxLength="60"
								minLength="5"
							/>

							<label className="formLabel">Address (optional)</label>
							<input
								className="formInputName"
								type="text"
								id="address"
								value={address}
								onChange={onMutate}
								maxLength="100"
								minLength="5"
							/>

							<label className="formLabel">Description (optional)</label>
							<textarea
								className="formInputAddress"
								type="text"
								id="description"
								value={description}
								onChange={onMutate}
							/>

							<label className="formLabel">Images</label>
							<label className="imagesInfo">
								The first image will be the cover (2MB Max.)
							</label>
							<input
								className="formInputFile"
								type="file"
								id="imgUrls"
								onChange={onMutate}
								accept=".jpg,.png,.jpeg,.webp"
								multiple
								required
							/>
							<button
								type="submit"
								className="primary-button createListingButton"
							>
								Create Project
							</button>
						</form>
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default CreateListing;
