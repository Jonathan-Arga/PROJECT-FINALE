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
    if (
      !FirstNameRef.current?.value ||
      !LastNameRef.current?.value ||
      !UsernameRef.current?.value ||
      !EmailRef.current?.value ||
      !PasswordRef.current?.value
    )
      return alert("Please fill in all fields");
    if (FirstNameRef.current.value.length < 2)
      return alert("First Name must be at least 2 characters long");
    if (LastNameRef.current.value.length < 2)
      return alert("Last Name must be at least 2 characters long");
    if (UsernameRef.current.value.length < 4)
      return alert("Username must be at least 4 characters long");
    if (PasswordRef.current.value.length < 8)
      return alert("Password must be at least 8 characters long");

    const res = await axios
      .post("/signup", {
        firstName: FirstNameRef.current.value,
        lastName: LastNameRef.current.value,
        username: UsernameRef.current.value,
        email: EmailRef.current.value,
        password: PasswordRef.current.value,
      })
      .catch((err) => alert(err.response.data.message));
    if (!res) return;
    if (res.status != 201) return alert("idfk" + res.data.message);
    sessionStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <form onSubmit={HandleSubmit}>
      <input required type="text" placeholder="First Name" ref={FirstNameRef} />
      <input required type="text" placeholder="Last Name" ref={LastNameRef} />
      <input required type="text" placeholder="Username" ref={UsernameRef} />
      <input required type="email" placeholder="Email" ref={EmailRef} />
      <input
        required
        type="password"
        placeholder="Password"
        ref={PasswordRef}
      />
      <button>Sign Up</button>
      <a onClick={() => navigate("/login")}>Already have an account? Login</a>
    </form>
  );
}
