import { createContext, useReducer } from "react";
import { postReducer } from "./postReducer";

const postsInitialState = {
  posts: [],
  isFetching: false,
  error: false,
};

export const postsContext = createContext(postsInitialState);

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, postsInitialState);
  return (
    <postsContext.Provider
      value={{
        posts: state.posts,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </postsContext.Provider>
  );
};
