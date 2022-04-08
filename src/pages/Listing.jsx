import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";

function Listing() {
	// Initial parameters
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shareLinkCopied, setShareLinkCopied] = useState(false);
	const navigate = useNavigate();
	const auth = getAuth();
	const params = useParams();
	// Get wanted listing on initial load
	useEffect(() => {
		// Async function to get listing based on id in url
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setListing(docSnap.data());
			}
			setLoading(false);
		};
		fetchListing();
	}, [params.listingId, navigate]);
	// Show spinner while page loads data
	if (loading) {
		return <Spinner />;
	}

	return (
		<main>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				slidesPerView={3}
				pagination={{ clickable: true }}
				navigation
				style={{ height: "300px" }}
			>
				{listing.imgUrls.map((url, index) => {
					return (
						<SwiperSlide key={index}>
							<div
								className="swiperSlideDiv"
								style={{
									background: `url(${listing.imgUrls[index]}) center no-repeat`,
									backgroundSize: "contain",
								}}
							></div>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<div
				className="shareIconDiv"
				onClick={() => {
					// Get url and copy to clipboard
					navigator.clipboard.writeText(window.location.href);
					// Chnage state to display message
					setShareLinkCopied(true);
					// Delay of 2s to reset state
					setTimeout(() => {
						setShareLinkCopied(false);
					}, 2000);
				}}
			>
				<img src={shareIcon} alt="share" />
			</div>
			{shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
			<div className="listingDetails">
				<p className="listingName">
					{listing.name} - $
					{listing.offer ? listing.discountedPrice : listing.regularPrice}
				</p>
				<p className="listingLocation">{listing.location}</p>
				<p className="listingType">
					For {listing.type === "rent" ? "rent" : "sale"}
				</p>
				{listing.offer && (
					<p className="discountPRice">
						${listing.regularPrice - listing.discountedPrice} discount
					</p>
				)}
				<ul className="listingDetailsList">
					<li>
						{listing.bedrooms > 1
							? `${listing.bedrooms} Bedrooms`
							: "1 Bedroom"}
					</li>
					<li>
						{listing.bathrooms > 1
							? `${listing.bedrooms} Bathrooms`
							: "1 Bathroom"}
					</li>
					<li>{listing.park && "Parking spot"}</li>
					<li>{listing.furnished && "Furnished"}</li>
				</ul>
				{/* Show Map */}
				<p className="listingLocationTitle">Location</p>
				<div className="leafletContainer">
					<MapContainer
						style={{ height: "100%", width: "100%" }}
						center={[listing.geolocation.lat, listing.geolocation.lng]}
						zoom={13}
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
						/>
						<Marker
							position={[listing.geolocation.lat, listing.geolocation.lng]}
						>
							<Popup>{listing.location}</Popup>
						</Marker>
					</MapContainer>
				</div>
				{
					// Send to a contact page with params
					// If listing not made by current user
					!auth.currentUser?.uid === listing.userRef && (
						<Link
							to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
							className="primaryButton"
						>
							Contact Landlord
						</Link>
					)
				}
			</div>
		</main>
	);
}

export default Listing;
