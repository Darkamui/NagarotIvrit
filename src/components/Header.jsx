import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header class="header__container fade-in">
			<div class="header__box-container ">
				<h1 class="fade-in-bottom">אנחנו מספקים</h1>
				<h1 class="fade-in-bottomDelay">נגרות בהתאמה אישית</h1>
				<div class="slide-in-elliptic-top-fwd">
					<p>
						אנו מלווים כל פרוייקט באופן אישי לכל אורך התהליך, משלב התכנון ועד
						להרכבה בבית הלקוח, <br />
						תוך כדי מתן ייעוץ ופתרונות טכניים ועיצוביים.
					</p>
					<div class="header__btn-container">
						<Link to="/projects" class="secondary-button">
							פרוייקטים
						</Link>
						<Link to="/contact" class="primary-button">
							צור קשר
						</Link>
					</div>
				</div>
			</div>
			<div class="mouse_scroll roll-in-left">
				<div class="mouse">
					<div class="wheel"></div>
				</div>
				<div>
					<span class="m_scroll_arrows unu"></span>
					<span class="m_scroll_arrows doi"></span>
					<span class="m_scroll_arrows trei"></span>
				</div>
			</div>
		</header>
	);
};

export default Header;
