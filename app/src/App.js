import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import New from "./pages/new";
import Saved from "./pages/saved";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";

function App() {
	return (
		<div className="App">
			<Router>
				<TopBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/new" element={<New />} />
					<Route path="/saved" element={<Saved />} />
				</Routes>
				<BottomBar />
			</Router>
		</div>
	);
}

export default App;
