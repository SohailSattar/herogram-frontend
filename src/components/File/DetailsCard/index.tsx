import React, { FC } from "react";
import { FaEye, FaCalendarAlt } from "react-icons/fa";

interface Props {
	uploadDate: string;
	views: number | string;
	fileName: string;
	thumbnailUrl: string;
	tags?: string[];
}

const FileDetailsCard: FC<Props> = ({
	uploadDate,
	views,
	fileName,
	thumbnailUrl,
	tags = [],
}) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
			<img
				className="w-full h-48 object-cover mb-4"
				src={thumbnailUrl}
				alt={fileName}
			/>
			<div className="mb-4">
				<span className="text-gray-800 font-bold">{fileName}</span>
			</div>
			<div className="flex items-center mb-4">
				<FaCalendarAlt className="text-gray-600 mr-2" />
				<span className="text-gray-800">Uploaded on: {uploadDate}</span>
			</div>
			<div className="flex items-center mb-4">
				<FaEye className="text-gray-600 mr-2" />
				<span className="text-gray-800">Views: {views}</span>
			</div>
			<div className="flex flex-wrap">
				{tags.map((tag, index) => (
					<span
						key={index}
						className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
};

export default FileDetailsCard;
