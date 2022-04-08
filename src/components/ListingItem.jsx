import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as BedIcon } from "../assets/svg/bedIcon.svg";
import { ReactComponent as BathtubIcon } from "../assets/svg/bathtubIcon.svg";
function ListingItem({ listing, id, onDelete }) {
	return (
		<li className="categoryListing">
			{/* Link to listing detail page w/ id */}
			<Link
				to={`/category/${listing.type}/${id}`}
				className="categoryListingLink"
			>
				<img
					src={listing.imgUrls}
					alt={listing.name}
					className="categoryListingImg"
				/>
				<div className="categoryListingDetails">
					<p className="categoryListingLocation">{listing.location}</p>
					<p className="categoryListingName">{listing.name}</p>
					<p className="categoryListingPrice">
						{/* Display different price depending on offer flag */}$
						{listing.offer ? listing.discountedPrice : listing.regularPrice}
						{/* Add text if rental */}
						{listing.type === "rent" && " / Month"}
					</p>
					<div className="categoryListingInfoDiv">
						<BedIcon />
						<p className="categoryListingInfoText">
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: "1 Bedroom"}
						</p>
						<BathtubIcon />
						<p className="categoryListingInfoText">
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: "1 Bathroom"}
						</p>
					</div>
				</div>
			</Link>

			{onDelete && (
				<DeleteIcon
					className="removeIcon"
					fill="rgb(231,76,60)"
					onClick={() => onDelete(listing.id, listing.name)}
				/>
			)}
		</li>
	);
}

export default ListingItem;
