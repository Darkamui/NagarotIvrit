// LOCAL IMPORTS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sass/index.scss";
// PAGES
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import CreateProject from "./pages/CreateProject";
import Home from "./pages/Home";
import EditProject from "./pages/EditProject";
import Projects from "./pages/Project";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Edit from "./pages/Edit";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/about" element={<About />} exact />
					<Route path="/contact" element={<Contact />} />
					{/* Nested protected route  */}
					<Route path="/yogibear" element={<PrivateRoute />}>
						<Route path="/yogibear" element={<Admin />} />
					</Route>
					<Route path="/create-project" element={<PrivateRoute />}>
						<Route path="/create-project" element={<CreateProject />} />
					</Route>
					<Route path="/edit-project/:projectId" element={<PrivateRoute />}>
						<Route path="/edit-project/:projectId" element={<EditProject />} />
					</Route>
					<Route path="/edit/:projectId" element={<PrivateRoute />}>
						<Route path="/edit/:projectId" element={<Edit />} />
					</Route>
					{/* Load depending on category */}
					<Route path="/category/:categoryName" element={<Category />} />
					{/* Load depending on listing */}

					<Route path="/sign-in" element={<SignIn />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
