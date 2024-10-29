import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

interface RegisterUserParams {
	username: string;
	email: string;
}

export const registerUser = async (userData: RegisterUserParams) => {
	try {
		const response = await axios.post(`${baseURL}/auth/register`, userData);
		return response.data;
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;
	}
};
