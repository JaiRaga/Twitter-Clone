import {
	GET_PROFILE,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_FOLLOWERS,
	GET_FOLLOWING,
	UPDATE_FOLLOWING,
	GET_USERS,
	SET_PROFILE,
} from '../actions/types'

const initialState = {
	profile: null,
	people: [],
	followers: [],
	following: [],
	loading: true,
	error: {},
}

export default (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case GET_USERS:
			return {
				...state,
				people: [...payload],
				loading: false,
			}

		case SET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			}

		case GET_FOLLOWERS:
			return {
				...state,
				followers: [...payload],
				loading: false,
			}

		case GET_FOLLOWING:
			return {
				...state,
				following: [...payload],
				loading: false,
			}

		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
			}

		default:
			return state
	}
}
