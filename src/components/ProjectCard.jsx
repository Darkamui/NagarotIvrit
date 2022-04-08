import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const ProjectCard = ({ project, images, categoryName }) => {
	const [tempImages, setTempImages] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [photoIndex, setPhotoIndex] = useState(0);
	useEffect(() => {
		let tempoImages = [];
		if (categoryName !== "projects") {
			images.forEach((image) => {
				if (
					image.data.tags.indexOf(categoryName) > -1 &&
					project.data.name === image.data.projectRef
				) {
					tempoImages.push(image);
				}
			});
		} else {
			images.forEach((image) => {
				if (project.data.name === image.data.projectRef) {
					tempoImages.push(image);
				}
			});
		}

		setTempImages(tempoImages);
		console.log(tempImages);
		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<Spinner />
			) : tempImages ? (
				<div className="projectCardsContainer animate__animated animate__fadeIn">
					<h3>{project.data.name}</h3>
					<Carousel
						dynamicHeight={false}
						autoPlay={true}
						showThumbs={false}
						showStatus={false}
						infiniteLoop={true}
						onClickItem={() => setIsOpen(true)}
					>
						{tempImages.map((image, index) => (
							<div className="projectCardImgContainer" key={index}>
								<img src={image.data.url} alt="" />
							</div>
						))}
					</Carousel>
					{isOpen && (
						<>
							<Lightbox
								mainSrc={tempImages[photoIndex].data.url}
								nextSrc={
									tempImages[(photoIndex + 1) % tempImages.length].data.url
								}
								prevSrc={
									tempImages[
										(photoIndex + tempImages.length - 1) % tempImages.length
									].data.url
								}
								onCloseRequest={() => setIsOpen(false)}
								onMovePrevRequest={() =>
									setPhotoIndex(
										(photoIndex + tempImages.length - 1) % tempImages.length
									)
								}
								onMoveNextRequest={() =>
									setPhotoIndex((photoIndex + 1) % tempImages.length)
								}
							/>
						</>
					)}
				</div>
			) : (
				"error"
			)}
		</>
	);
};

export default ProjectCard;
