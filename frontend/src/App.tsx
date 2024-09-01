import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Todos from "./pages/Todos/Todos";
import Posts from "./pages/Posts/Posts";
import PostPage from "./pages/Posts/PostPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				<Route path="/todos" element={<Todos />} />
				<Route path="/posts" element={<Posts />}>
					<Route path=":postid" element={<PostPage />} />
				</Route>

				<Route path="*" element={<div>404 Not Found</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
