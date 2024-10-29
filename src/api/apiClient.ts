// apiClient.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define the base API client
const apiClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
	timeout: 5000,
});

// Define an interface for request parameters
interface RequestParams<T = any> {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	data?: T;
	params?: Record<string, any>;
	headers?: Record<string, string>;
}

// Generic function to make API requests with type support
export const makeRequest = async <TResponse = any, TData = any>({
	url,
	method = "GET",
	data,
	params,
	headers,
}: RequestParams<TData>): Promise<TResponse> => {
	const config: AxiosRequestConfig = {
		url,
		method,
		data,
		params,
		headers,
	};

	try {
		const response: AxiosResponse<TResponse> = await apiClient(config);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			// Handle error response from server
			throw new Error(
				`Error: ${error.response.status} - ${error.response.data}`
			);
		}
		if (error instanceof Error) {
			throw new Error(error.message || "An unknown error occurred");
		}
		throw new Error("An unknown error occurred");
	}
};
