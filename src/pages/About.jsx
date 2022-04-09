import React from "react";
import vid from "../img/carpenter1.mp4";
import wood from "../img/wood.png";
import about from "../img/about.png";
const About = () => {
	return (
		<>
			<section className="about__page">
				<video
					id="background-video"
					className="fade-in"
					poster={about}
					autoPlay
					loop
					muted
				>
					<source src={vid} type="video/mp4" />
				</video>

				<div className="about__toprow slit-in-vertical">
					<div className="about__content-container">
						<h1>ברוכים הבאים לנגרות עברית</h1>
						<p>
							שלום וברכה - אם כבר הגעת עד כאן הנה כמה דברים שכדאי לך לדעת עלינו:
							<br />
							1. קוראים לנו יוגב ואסף.
							<br />
							2. אנו קיימים משנת 2007.
							<br />
							3. אנו עובדים עם בתי עסק, אדריכלים ולקוחות פרטיים כאחד.
							<br />
							4. אנו מלווים כל פרוייקט באופן אישי לכל אורך התהליך, משלב התכנון
							ועד להרכבה בבית הלקוח, תוך כדי מתן ייעוץ ופתרונות טכניים
							ועיצוביים.
							<br />
							5. אמינות, איכות ורצון מהווים עבורינו שורשים איתנים ליצור עבורך את
							עבודת העץ בצורה הטובה והאיכותית ביותר.
							<br />
							6. אנו מאמינים שכשם שאנשים שונים, כך גם טעמם האישי שונה ולכן כל
							העבודות שלנו הן בהתאמה אישית לכל לקוח.
						</p>
					</div>
					<div className="about__img-container">
						<img src={wood} alt="" />
					</div>
				</div>
			</section>
		</>
	);
};

export default About;
