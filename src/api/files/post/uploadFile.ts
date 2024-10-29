import axios from "axios";
import localStorageService from "../../../network/localStorageService";

const uploadFile = async (file: File): Promise<void> => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const token = localStorageService.getJwtToken();

		const baseURL = process.env.REACT_APP_API_URL;
		const url = `${baseURL}/files/upload`;

		const response = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("File uploaded successfully:", response.data);
	} catch (error) {
		console.error("Error uploading file:", error);
	}
};

export default uploadFile;
