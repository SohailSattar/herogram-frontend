// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import localStorageService from "../network/localStorageService";
import { useNavigate } from "react-router-dom";

import * as RoutePath from "../RouteConfig";

interface AuthContextType {
	user: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<string | null>(null);
	const navgate = useNavigate();

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();
			if (response.ok) {
				setUser(data.token);
				localStorageService.setJwtToken(data.token);
				navgate(RoutePath.FILES);
			} else {
				console.error("Login failed", data);
			}
		} catch (error) {
			console.error("An error occurred during login", error);
		}
	};

	const logout = () => {
		setUser(null);
		// Optionally, remove token from localStorage
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
