import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./router/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ManageStudy from "./pages/ManageStudy";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/signin" element={<SignIn />}></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/manage" element={<ManageStudy />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
