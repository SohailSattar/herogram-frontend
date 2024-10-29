export interface APIFileDetails {
	_id: string;
	filename: string;
	userId: string;
	tags?: string[];
	views: number;
	shareToken: string;
	__v: number;
	url: string;
}

export interface APIFileList {
	files: APIFileDetails[];
}
