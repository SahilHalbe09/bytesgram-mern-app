import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

const Auth = () => {
	return (
		<div className="lg:flex items-center justify-center w-screen h-screen max-h-screen lg:gap-5">
			<Login />
			<Register />
		</div>
	);
};

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [_, setCookies] = useCookies("access_token");

	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post("https://bytesgram-mern-app.onrender.com/auth/login", { username, password });
			setCookies("access_token", response.data.token);
			window.localStorage.setItem("userID", response.data.userID);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Login"} onSubmit={onSubmit} />;
};

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			await axios.post("https://bytesgram-mern-app.onrender.com/auth/register", { username, password });
			alert("Registration Complete! Now Login");
		} catch (error) {
			console.error(error);
		}
	};

	return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Register"} onSubmit={onSubmit} />;
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
	return (
		<div className="border max-w-md lg:w-96 p-4 sm:flex-col flex justify-center w-screen items-center mt-20 sm:my-auto">
			<form className="flex max-w-md flex-col gap-4 lg:w-72 w-60" onSubmit={onSubmit}>
				<h2 className="text-2xl font-light mb-5">{label}</h2>

				<div>
					<div className="mb-2 block">
						<Label htmlFor="username">Username: </Label>
					</div>
					<TextInput type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>

				<div>
					<div className="mb-2 block">
						<Label htmlFor="password">Password: </Label>
					</div>
					<TextInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<Button type="submit">{label}</Button>
			</form>
		</div>
	);
};

export default Auth;
