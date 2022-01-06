import {
  userStart,
  userFailure,
  userSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  logout,
} from "./../UserContext/UserActions";
import axiosInstance from "./../../axios";

//Login
export const userLogin = async (user, dispatch) => {
  dispatch(userStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    dispatch(userSuccess(res.data));
  } catch (error) {
    dispatch(userFailure());
  }
};

//Logout
export const Logout = (dispatch) => {
  dispatch(logout());
};

//Update User

export const UpdateUser = async (id, dispatch, info) => {
  dispatch(updateStart());
  try {
    const res = await axiosInstance.put("users/" + id, info);
    dispatch(updateSuccess(res.data));
  } catch (error) {
    dispatch(updateFailure());
  }
};

//Deleting User
export const DeleteUser = async (id, dispatch) => {
  dispatch(deleteStart());
  try {
    await axiosInstance.delete("users/" + id);
    dispatch(deleteSuccess());
  } catch (error) {
    dispatch(deleteFailure());
  }
};
