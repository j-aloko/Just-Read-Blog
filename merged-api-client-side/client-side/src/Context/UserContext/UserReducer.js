export const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_START":
      return {
        user: null,
        isFetching: true,
        success: false,
        isError: false,
      };
    case "USER_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        success: true,
        isError: false,
      };
    case "USER_FAILURE":
      return {
        user: null,
        isFetching: false,
        success: false,
        isError: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        success: true,
        isError: false,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
        success: false,
        isError: false,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        success: true,
        isError: false,
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        isFetching: false,
        success: false,
        isError: true,
      };
    case "DELETE_START":
      return {
        ...state,
        isFetching: true,
        success: false,
        isError: false,
      };
    case "DELETE_SUCCESS":
      return {
        user: null,
        isFetching: false,
        success: true,
        isError: false,
      };
    case "DELETE_FAILURE":
      return {
        ...state,
        isFetching: false,
        success: false,
        isError: true,
      };

    default:
      return { ...state };
  }
};
