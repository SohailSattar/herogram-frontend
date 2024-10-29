export interface APIResponse<T> {
	data?: T;
	error?: any;
}

export interface APIResponseStatus {
	id?: number;
	success?: boolean;
	message?: string;
	errors?: string[];
}
