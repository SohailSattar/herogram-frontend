import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const Login: React.FC = () => {
	const { login } = useAuth();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<{
		username?: string;
		password?: string;
	}>({});

	const validateInputs = () => {
		const newErrors: { username?: string; password?: string } = {};
		if (!username) {
			newErrors.username = "Username is required";
		} else if (username.length < 3) {
			newErrors.username = "Username must be at least 3 characters long";
		}

		if (!password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateInputs()) {
			await login(username, password)
				.then(() => {
					console.log("Logged in successfully");
				})
				.catch(() => {
					console.error("Login failed");
				});
		}
	};

	return (
		<div className="max-w-sm mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<input
						type="text"
						placeholder="Username"
						className="w-full p-2 border border-gray-300 rounded"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					{errors.username && (
						<p className="text-red-500 text-sm">{errors.username}</p>
					)}
				</div>
				<div>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 border border-gray-300 rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password}</p>
					)}
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
