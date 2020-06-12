import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "./loginActions";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function loginReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case GET_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.user
      };

    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}
