import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import Footer from "../components/Footer";

const SignIn = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const navigate = useNavigate();
	// Set form data
	const onChange = (e) => {
		setFormData((prevState) => ({
			// Get previous data
			...prevState,
			// Get and set data based on input id
			[e.target.id]: e.target.value,
		}));
	};
	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			// Get authorization service
			const auth = getAuth();
			// Attempt sign in with user auth and data
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			// Redirect if user
			if (userCredential.user) {
				navigate("/yogibear");
			}
		} catch (error) {
			toast.error("Bad User credentials");
			navigate("/");
		}
	};
	return (
		<>
			<div className="signInPageContainer">
				<header>
					<p className="signInPageHeader">Welcome Back</p>
				</header>

				<form onSubmit={onSubmit}>
					<input
						type="email"
						className="emailInput"
						placeholder="email"
						id="email"
						value={email}
						onChange={onChange}
					/>
					<input
						// Set type depending on state
						type="password"
						className="passwordInput"
						placeholder="password"
						id="password"
						value={password}
						onChange={onChange}
					/>

					<div className="signInBar">
						<button className="signInButton">
							<ArrowRightIcon fill="#fff" width="34px" height="34px" />
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default SignIn;
