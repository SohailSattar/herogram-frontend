import axios from "axios";
import { APIFileList } from "../types";
import { APIResponse } from "../../types";
import localStorageService from "../../../network/localStorageService";

const baseURL = process.env.REACT_APP_API_URL;

export const getAllFiles = async (): Promise<APIResponse<APIFileList>> => {
	try {
		const token = localStorageService.getJwtToken();

		const response = await axios.get<APIFileList>(`${baseURL}/files`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data;
		return { data };
	} catch (err: any) {
		const error = err.response.data;
		return { error };
	}
};
