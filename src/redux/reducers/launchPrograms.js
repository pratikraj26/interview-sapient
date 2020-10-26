const initialState = {
	fetched: false,
	launchPrograms: [],
	error: null,
};

export default function launchPrograms(state = initialState, action = {}) {
	switch (action.type) {
		case "FETCH_LAUNCH_PROGRAMS_PROGRESS":
			return {
				...state,
				fetched: false,
				error: null,
			};
		case "FETCH_LAUNCH_PROGRAMS_SUCCESS":
			return {
				...state,
				fetched: true,
				launchPrograms: action.payload,
				error: null,
			};
		case "FETCH_LAUNCH_PROGRAMS_FAILED":
			return {
				...state,
				fetched: true,
				error: action.payload,
			};
		default:
			return {
				...state,
			};
	}
}
