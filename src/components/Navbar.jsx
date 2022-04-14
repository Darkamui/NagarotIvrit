import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import { RiEnglishInput } from "react-icons/ri";
import mini from "../img/mini-carp.jpg";
import logo from "../img/logo.png";
function Navbar() {
	const [toggle, setToggle] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {}, [toggle]);

	return (
		<nav>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<div className="app__navbar-menu">
					{!toggle && <HiMenuAlt4 onClick={() => setToggle(true)} />}

					{toggle && (
						<div>
							<HiX onClick={() => setToggle(false)} />
							<ul>
								<li>
									<Link to="/" onClick={() => setToggle(false)}>
										בית
									</Link>
								</li>
								<li>
									<Link to="/projects" onClick={() => setToggle(false)}>
										פרוייקטים
									</Link>
								</li>
								<li>
									<Link to="/about" onClick={() => setToggle(false)}>
										אודות
									</Link>
								</li>
								<li>
									<Link to="/contact" onClick={() => setToggle(false)}>
										צור קשר
									</Link>
								</li>
							</ul>
							<img src={mini} alt="" />
						</div>
					)}
				</div>
				<a href="" className="enMobile">
					<RiEnglishInput size={"2.5rem"} />
				</a>
			</div>

			<div className="navSocialContainer">
				<a
					href="https://www.facebook.com/nagarotevrit"
					target="_blank"
					rel="noreferrer"
					className="navLink"
				>
					<i className="fab fa-facebook"></i>
				</a>
				<a
					href="https://www.twitter.com/nagarotevrit/"
					target="_blank"
					rel="noreferrer"
					className="navLink"
				>
					<i className="fab fa-twitter"></i>
				</a>
				<Link to="/yogibear" className="navLink">
					<i className="fab fa-youtube"></i>
				</Link>
				<a
					href="https://www.instagram.com/nagarotevrit/"
					target="_blank"
					rel="noreferrer"
					className="navLink"
				>
					<i className="fab fa-instagram"></i>
				</a>
			</div>
			<div className="navLinksContainer">
				<li>
					<Link to="/" className="navLink">
						בית
					</Link>
				</li>

				<li>
					<Link to="/projects" className="navLink">
						פרוייקטים
					</Link>
				</li>
				<li>
					<div className="catLink">
						<div
							className="navLink catContainer"
							onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
						>
							קטגריות
							<AiFillCaretDown className="downArrow" />
						</div>
						{isOpen && (
							<ul className="catDrop">
								<li>
									<Link
										to="/category/kitchen"
										className="navLink"
										onClick={() =>
											isOpen ? setIsOpen(false) : setIsOpen(true)
										}
									>
										מטבחים
									</Link>
								</li>
								<li>
									<Link
										to="/category/bathroom"
										className="navLink"
										onClick={() =>
											isOpen ? setIsOpen(false) : setIsOpen(true)
										}
									>
										ארונות אמבטיה
									</Link>
								</li>
								<li>
									<Link
										to="/category/library"
										className="navLink"
										onClick={() =>
											isOpen ? setIsOpen(false) : setIsOpen(true)
										}
									>
										ארונות וספריות
									</Link>
								</li>
								<li>
									<Link
										to="/category/bible"
										className="navLink"
										onClick={() =>
											isOpen ? setIsOpen(false) : setIsOpen(true)
										}
									>
										ספריות קודש
									</Link>
								</li>
							</ul>
						)}
					</div>
				</li>
				<li>
					<Link to="/about" className="navLink">
						אודות
					</Link>
				</li>
				<li>
					<Link to="/contact" className="navLink">
						צור קשר
					</Link>
				</li>
				<li>
					<Link to="/contact" className="navLink">
						En
					</Link>
				</li>
			</div>
			<div className="navLogoContainer">
				<img src={logo} className="navLogo" alt="" />
			</div>
		</nav>
	);
}

export default Navbar;
