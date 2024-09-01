import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Signup() {
	const navigate = useNavigate();

	const FirstNameRef = useRef<HTMLInputElement>(null);
	const LastNameRef = useRef<HTMLInputElement>(null);
	const UsernameRef = useRef<HTMLInputElement>(null);
	const EmailRef = useRef<HTMLInputElement>(null);
	const PasswordRef = useRef<HTMLInputElement>(null);

	const HandleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await axios.post("/users", {
			firstName: FirstNameRef.current?.value,
			lastName: LastNameRef.current?.value,
			username: UsernameRef.current?.value,
			email: EmailRef.current?.value,
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
				placeholder="First Name"
				ref={FirstNameRef}
			/>
			<input
				required
				type="text"
				placeholder="Last Name"
				ref={LastNameRef}
			/>
			<input
				required
				type="text"
				placeholder="Username"
				ref={UsernameRef}
			/>
			<input required type="email" placeholder="Email" ref={EmailRef} />
			<input
				required
				type="password"
				placeholder="Password"
				ref={PasswordRef}
			/>
			<button>Sign Up</button>
			<a onClick={() => navigate("/login")}>
				Already have an account? Login
			</a>
		</form>
	);
}
