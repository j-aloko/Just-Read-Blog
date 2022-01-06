//Create Posts
export const createPostStart = () => ({
  type: "CREATE_POST_START",
});

export const createPostSuccess = (post) => ({
  type: "CREATE_POST_SUCCESS",
  payload: post,
});

export const createPostFailure = () => ({
  type: "CREATE_POST_FAILURE",
});

//GET Post
export const getPostsStart = () => ({
  type: "GET_POSTS_START",
});

export const getPostsSuccess = (posts) => ({
  type: "GET_POSTS_SUCCESS",
  payload: posts,
});

export const getPostsFailure = () => ({
  type: "GET_POSTS_FAILURE",
});

//DELETE POSTS

export const deletePostsStart = () => ({
  type: "DELETE_POSTS_START",
});

export const deletePostsSuccess = (id) => ({
  type: "DELETE_POSTS_SUCCESS",
  payload: id,
});

export const deletePostsFailure = () => ({
  type: "DELETE_POSTS_FAILURE",
});

//UpdatePosts
export const updateStart = () => ({
  type: "UPDATE_START",
});

export const updateSuccess = (post) => ({
  type: "UPDATE_SUCCESS",
  payload: post,
});

export const updateFailure = () => ({
  type: "UPDATE_FAILURE",
});
