import uploadFile from "../../../api/files/post/uploadFile";
import FileUpload from "../../../components/File/FileUpload";

const FileUploadPage = () => {
	const uploadFileHandler = async (file: File, tags: string[]) => {
		await uploadFile(file);
	};

	return <FileUpload onUpload={uploadFileHandler} />;
};

export default FileUploadPage;
