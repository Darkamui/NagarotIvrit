import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const useAuthStatus = () => {
	// State for logged in
	const [loggedIn, setLoggedIn] = useState(false);
	// State for loading
	const [checkingStatus, setCheckingStatus] = useState(true);
	// Fix for memory leak warning
	const isMounted = useRef(true);
	// Check and set user logged in  status
	useEffect(() => {
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				}
				setCheckingStatus(false);
			});
		}
		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);

	return { loggedIn, checkingStatus };
};
