import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!sessionStorage.getItem("token")) {
			navigate("/login");
		}
	});

	return (
		<div>
			<nav>
				<a onClick={() => navigate("/todos")}>Todos</a>
				<a onClick={() => navigate("/posts")}>Posts</a>
				<a onClick={() => navigate("/login")}>Logout</a>
			</nav>
			{location.pathname == "/" && <h1>Home Page</h1>}
			<Outlet />
		</div>
	);
}
