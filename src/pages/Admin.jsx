import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
function Profile() {
	const auth = getAuth();

	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	// Logout using auth
	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};
	const redirect = () => {
		navigate("/create-project");
	};
	useEffect(() => {
		const fetchUserListings = async () => {
			const listingsRef = collection(db, "Projects");

			const querySnap = await getDocs(listingsRef);
			let listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings);
			setLoading(false);
			console.log(listings);
		};
		fetchUserListings();
	}, [auth.currentUser.uid]);

	// Delete listing of user
	const onDelete = async (listingId) => {
		if (window.confirm("Are you sure you want to delete?")) {
			// Delete from firestore
			await deleteDoc(doc(db, "Projects", listingId));
			// Delete from state
			const updatedListing = listings.filter(
				(listing) => listing.id !== listingId
			);
			setListings(updatedListing);
			toast.success("Successfully deleted listing");
		}
	};
	return (
		<>
			<div className="adminContainer">
				<div className="adminHeaderContainer">
					<div className="leftHeader">
						<header className="profileHeader">
							<p className="pageHeader">My Profile</p>
						</header>

						<section class="profileMain">
							<button
								className="secondary-button"
								type="button"
								onClick={redirect}
							>
								Add Project
							</button>
							<button
								className=" primary-button"
								type="button"
								onClick={onLogout}
							>
								Logout
							</button>
						</section>
					</div>
					<div className="rightHeader">
						{
							/* {Listing componenet} */
							loading ? (
								<Spinner />
							) : (
								listings.map((listing, index) => (
									<>
										<div className="projectListContainer" key={index}>
											<div className="projectList">
												<div className="leftList">
													<p>{listing.data.name}</p>
													<img src={listing.data.coverImg} alt="" />
												</div>

												<DeleteIcon
													className="removeIcon"
													fill="rgb(231, 76,60)"
													onClick={() => onDelete(listing.id)}
												/>
											</div>
										</div>
									</>
								))
							)
						}
						{/* <p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
							natus, quos dolore quibusdam amet quaerat optio reprehenderit
							possimus consequatur. Assumenda dicta ipsam ipsa voluptatibus
							mollitia ullam cumque, est et sit similique aut eum placeat
							distinctio cum obcaecati harum dignissimos aliquid soluta facilis
							necessitatibus optio fuga eveniet modi nemo! Vel molestias
							corrupti exercitationem corporis nulla consequatur quisquam,
							laboriosam dolorem laborum beatae impedit deleniti accusantium
							dicta voluptates veniam officiis esse nostrum reprehenderit ipsam
							deserunt vero animi. Laboriosam laudantium quam quibusdam libero
							cum temporibus esse eos laborum, ipsa molestiae, fugit animi
							facilis nisi, alias accusamus velit earum molestias corrupti quis
							nulla voluptatibus doloribus?
						</p> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
