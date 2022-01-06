import {
  updateStart,
  updateFailure,
  updateSuccess,
} from "./../PostContext/postActions";
import axiosInstance from "./../../axios";

//Update Post

export const UpdatePost = async (newPost, path, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axiosInstance.put("posts/" + path, newPost);
    dispatch(updateSuccess(res.data));
    window.location.reload();
  } catch (error) {
    dispatch(updateFailure());
  }
};
