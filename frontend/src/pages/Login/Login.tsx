import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Login() {
	const navigate = useNavigate();

	const UsernameRef = useRef<HTMLInputElement>(null);
	const PasswordRef = useRef<HTMLInputElement>(null);

	const HandleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await axios.post("/login", {
			username: UsernameRef.current?.value,
			password: PasswordRef.current?.value,
		});

		if (res.status != 200) return alert(res.data.message);

		sessionStorage.setItem("token", res.data.token);
		navigate("/");
	};
	return (
		<form onSubmit={HandleSubmit}>
			<input
				required
				type="text"
				placeholder="Username"
				ref={UsernameRef}
			/>
			<input
				required
				type="password"
				placeholder="Password"
				ref={PasswordRef}
			/>
			<button>Login</button>
			<a onClick={() => navigate("/signup")}>
				Don't have an account? Sign Up
			</a>
		</form>
	);
}
