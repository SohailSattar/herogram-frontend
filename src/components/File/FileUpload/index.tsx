// src/components/FileUpload.tsx
import React, { useState } from "react";

interface Props {
	onUpload: (file: File, tags: string[]) => void;
}

const FileUpload: React.FC<Props> = ({ onUpload }) => {
	const [file, setFile] = useState<File | null>(null);
	const [tags, setTags] = useState<string>("");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (
			selectedFile &&
			(selectedFile.type.includes("image") ||
				selectedFile.type.includes("video"))
		) {
			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		} else {
			alert("Please select an image or video file");
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (file) {
			onUpload(
				file,
				tags.split(",").map((tag) => tag.trim())
			);
			setFile(null);
			setTags("");
			setPreviewUrl(null);
		}
	};

	return (
		<div className="max-w-md mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Upload File</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="file"
					accept="image/*,video/*"
					onChange={handleFileChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
				<input
					type="text"
					placeholder="Tags (comma-separated)"
					className="w-full p-2 border border-gray-300 rounded"
					value={tags}
					onChange={(e) => setTags(e.target.value)}
				/>
				<button
					type="submit"
					className="w-full bg-green-500 text-white p-2 rounded"
				>
					Upload
				</button>
			</form>
			{previewUrl && (
				<div className="mt-4">
					{file?.type.includes("image") ? (
						<img src={previewUrl} alt="Preview" className="w-full h-auto" />
					) : (
						<video src={previewUrl} controls className="w-full h-auto" />
					)}
				</div>
			)}
		</div>
	);
};

export default FileUpload;
