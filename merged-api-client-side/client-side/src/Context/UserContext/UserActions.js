//Login User
export const userStart = () => ({
  type: "USER_START",
});

export const userSuccess = (user) => ({
  type: "USER_SUCCESS",
  payload: user,
});

export const userFailure = () => ({
  type: "USER_FAILURE",
});

//Logout User
export const logout = () => ({
  type: "LOGOUT",
});

//Update User

export const updateStart = () => ({
  type: "UPDATE_START",
});

export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const updateFailure = () => ({
  type: "UPDATE_FAILURE",
});

//Deleting a user

export const deleteStart = () => ({
  type: "DELETE_START",
});

export const deleteSuccess = () => ({
  type: "DELETE_SUCCESS",
});

export const deleteFailure = () => ({
  type: "DELETE_FAILURE",
});
