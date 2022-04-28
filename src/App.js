import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./router/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StudyManager from "./pages/StudyManager";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/signin" element={<SignIn />}></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/manage" element={<StudyManager />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
