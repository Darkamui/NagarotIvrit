import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
const ForgotPassword = () => {
	// State for email data
	const [email, setEmail] = useState("");
	// Set email data when form changes
	const onChange = (e) => setEmail(e.target.value);
	// Submit form
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			// Send password reset link with firebase auth and email
			await sendPasswordResetEmail(auth, email);
			toast.success("Email was sent");
		} catch (error) {
			toast.error("Could not send reset e-mail");
		}
	};
	return (
		<div className="pageContainer">
			<header>
				<p className="pageHeader">Forgot Password</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						placeholder="E-mail"
						id="email"
						value={email}
						onChange={onChange}
						className="emailInput"
					/>
					<Link className="forgotPasswordLink" to="/sign-in">
						Sign In
					</Link>
					<div className="signInBar">
						<div className="signInText">Send Reset Link</div>
						<button className="signInButton">
							<ArrowRightIcon fill="white" width="34px" height="34px" />
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;
