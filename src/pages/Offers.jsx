import React, { useEffect, useState } from "react";
// Used to get value from url
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
	// State for data
	const [listings, setListings] = useState(null);
	// State for loading
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Async cannot be used on useEffect so function is made
		const fetchListings = async () => {
			try {
				// Get collection reference
				const listingsRef = collection(db, "listings");
				// Create a query
				const q = query(
					listingsRef,
					where("offer", "==", true),
					orderBy("timestamp", "desc", limit(10))
				);

				// Execute query into snapshot
				const querySnap = await getDocs(q);
				// Parse data from snapshot into an array
				let listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				// Set data in state
				setListings(listings);
				setLoading(false);
			} catch (error) {
				console.log(error);
				toast.error("Could not fetch data");
			}
		};
		// Call of the main async function
		fetchListings();
	}, []);

	return (
		<div>
			<header>
				<p className="pageHeader">Offers</p>
			</header>
			{/* If loading display spinner, else if display listings or say no listings */}
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="categoryListings">
							{
								//For each listing, send data and id to render item
								listings.map((listing) => (
									<ListingItem
										listing={listing.data}
										id={listing.id}
										key={listing.id}
									/>
								))
							}
						</ul>
					</main>
				</>
			) : (
				<p>There are no current offers</p>
			)}
		</div>
	);
}

export default Offers;
