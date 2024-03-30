import { Plugin } from "gramio";

export function autoRetry() {
	return new Plugin("@gramio/auto-retry").onResponseError(
		async (error, api) => {
			if (error.payload?.retry_after) {
				console.log(error.method, error.payload);
				setTimeout(
					//@ts-expect-error
					() => api[error.method](error.params),
					error.payload.retry_after * 1000,
				);
			}
		},
	);
}
