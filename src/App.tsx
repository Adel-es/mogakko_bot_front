import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./index";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ScheduleManager from "./pages/ScheduleManager";

function App() {
	return (
		<Provider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/signin" element={<SignIn />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
					<Route path="/schedule" element={<ScheduleManager />}></Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
