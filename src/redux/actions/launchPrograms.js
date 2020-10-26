import axios from "axios";
import config from "~/config";

export const fetchLaunchPrograms = (params) => async (dispatch) => {
	dispatch({
		type: "FETCH_LAUNCH_PROGRAMS_PROGRESS",
	});
	try {
		const response = await axios({
			url: `${config.apiBaseV1}/launches`,
			method: "GET",
			params: params,
		});
		const responseBody = await response.data;
		dispatch({
			type: "FETCH_LAUNCH_PROGRAMS_SUCCESS",
			payload: responseBody,
		});
	} catch (error) {
		dispatch({
			type: "FETCH_LAUNCH_PROGRAMS_FAILED",
			payload:
				(error.response && error.response.data) ||
				"An unknown error has occured.",
		});
	}
};
