import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";
const PrivateRoute = () => {
	// Get status from hook
	const { loggedIn, checkingStatus } = useAuthStatus();
	// Display something while loading
	if (checkingStatus) {
		return <Spinner />;
	}
	// Outlet allows to render a child component
	// Route child in App will be rendered if logged in
	return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
