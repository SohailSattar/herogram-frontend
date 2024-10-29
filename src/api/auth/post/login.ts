import axios from "axios";
import { LoginResponse, UserDetails } from "../types";

const baseURL = process.env.REACT_APP_API_URL;

export const login = async (
	credentials: UserDetails
): Promise<LoginResponse> => {
	try {
		const response = await axios.post<LoginResponse>(
			`${baseURL}/auth/login`,
			credentials
		);
		return response.data;
	} catch (error) {
		throw new Error("Failed to login");
	}
};
