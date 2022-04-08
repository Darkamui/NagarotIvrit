import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";

import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { email, password, name } = formData;
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
			// Get authorization
			const auth = getAuth();
			// Create new user authorization with email and password
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			// Get created user
			const user = userCredential.user;
			// Update name to form name
			updateProfile(auth.currentUser, { displayName: name });
			// Copy data to store and not alter state
			const FormDataCopy = { ...formData };
			// Delete password as to not store in documents
			delete FormDataCopy.password;
			// Set timestamp of creation
			FormDataCopy.timestamp = serverTimestamp();
			// Create doc in wanted collection with the user Id and user data
			await setDoc(doc(db, "users", user.uid), FormDataCopy);
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong during registration.");
		}
	};
	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back</p>
				</header>

				<form onSubmit={onSubmit}>
					<input
						type="text"
						className="nameInput"
						placeholder="name"
						id="name"
						value={name}
						onChange={onChange}
					/>
					<input
						type="email"
						className="emailInput"
						placeholder="email"
						id="email"
						value={email}
						onChange={onChange}
					/>
					<div className="passwordInputDiv">
						<input
							type={showPassword ? "text" : "password"}
							className="passwordInput"
							placeholder="password"
							id="password"
							value={password}
							onChange={onChange}
						/>
						<img
							src={visibilityIcon}
							alt="Show password"
							className="showPassword"
							//  Flip state between true and false using prevState
							onClick={() => setShowPassword((prevState) => !prevState)}
						/>
					</div>

					<div className="signInBar">
						<p className="signInText">Sign Up</p>
						<button className="signInButton">
							<ArrowRightIcon fill="#fff" width="34px" height="34px" />
						</button>
					</div>
				</form>
				<OAuth />
				<Link to="/sign-in" className="registerLink">
					Sign In Instead
				</Link>
			</div>
		</>
	);
};

export default SignUp;
