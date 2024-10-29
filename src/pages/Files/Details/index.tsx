import React from "react";

const FileDetailsPage: React.FC = () => {
	return (
		<div className="container mx-auto p-4">
			<div className="bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-4">File Details</h1>
				<div className="flex flex-col md:flex-row">
					<div className="md:w-1/2 p-2">
						<img
							src="https://via.placeholder.com/400"
							alt="File"
							className="w-full h-auto rounded-lg"
						/>
					</div>
					<div className="md:w-1/2 p-2">
						<div className="mb-4">
							<h2 className="text-xl font-semibold">File Name</h2>
							<p className="text-gray-600">example-file.jpg</p>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">File Size</h2>
							<p className="text-gray-600">1.2 MB</p>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">Uploaded By</h2>
							<p className="text-gray-600">John Doe</p>
						</div>
						<div className="mb-4">
							<h2 className="text-xl font-semibold">Upload Date</h2>
							<p className="text-gray-600">2023-10-01</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileDetailsPage;
