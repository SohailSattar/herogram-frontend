import { Link } from "react-router-dom";
import FileDetailsCard from "../../../components/File/DetailsCard";
import * as RoutePath from "../../../RouteConfig";
import { APIFileDetails } from "../../../api/files/types";
import { useEffect, useState } from "react";
import { getAllFiles } from "../../../api/files/get/getAll";
import FileDetailsCardList from "../../../components/File/DetailsCardList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const FilesPage = () => {
	const [details, setDetails] = useState<APIFileDetails[]>([]);

	useEffect(() => {
		const fetchFiles = async () => {
			try {
				const response = await getAllFiles();
				if (response?.data?.files) {
					setDetails(response.data.files);
					console.log("Files fetched:", response.data.files);
				}
			} catch (error) {
				console.error("Error fetching files:", error);
			}
		};

		fetchFiles();
	}, []);

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1>Files Page</h1>
				<Link
					to={RoutePath.FILES_NEW}
					style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
				>
					Upload File
				</Link>
			</div>

			<DndProvider backend={HTML5Backend}>
				{details.length > 0 ? (
					<FileDetailsCardList files={details} />
				) : (
					<p>No files available.</p>
				)}
			</DndProvider>
		</div>
	);
};

export default FilesPage;
