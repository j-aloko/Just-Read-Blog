import React, { useContext, useEffect, useState } from "react";
import "./Postpage.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { userContext } from "./../../Context/UserContext/UserContext";
import { Editor } from "@tinymce/tinymce-react";
import { UpdatePost } from "../../Context/ApiCalls/Posts";
import { postsContext } from "./../../Context/PostContext/postContext";
import CircularProgress from "@mui/material/CircularProgress";
import SidebarAuthor from "./../../Components/SidebarAuthor/SidebarAuthor";
import Comments from "./../../Components/Comments/Comments";
import RelatedPost from "./../../Components/RelatedPost/RelatedPost";
import axiosInstance from "./../../axios";
import {
  MyReadPostImageLoader,
  MyReadPostTitleLoader,
  AuthorAndTimeStamp,
  MySidebarDescriptionLoader,
  Description,
  MySidebarImageLoader,
  MySidebarCategoryLoader,
  MySidebarCategoriesLoader,
} from "./../../SkeletonLoader";

function Postpage({ socket }) {
  const history = useHistory();

  const params = useParams();
  const path = params.postId;
  const { isFetching, dispatch } = useContext(postsContext);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [authors, setAuthors] = useState(null);
  const [comments, setComments] = useState([]);
  const [numOfComments, setNumOfComments] = useState();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [numOfRelatedPosts, setNumOfRelatedPosts] = useState();
  const { user } = useContext(userContext);

  //Sroll window to top of the page if this components mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  //Fetching Post per Id, anytime this page renders
  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("posts/" + path);
      setPost(res.data);
      setNumOfComments(res.data.comments.length);
    };
    getPost();
  }, [path]);

  //Deleting Post if authors name matches  username name in the postSchema
  const handleDelete = async () => {
    if (post.username === user.username) {
      try {
        await axiosInstance.delete("posts/" + path);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Updating Post
  const handleUpdate = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
    };
    if (post.username === user.username) {
      UpdatePost(newPost, path, dispatch);
    }
  };

  //get Author's Info
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get("users");
        setAuthors(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  //Now we can filter to get the specific author
  const author = authors?.filter(
    (author) => author.username === post?.username
  );

  //Fetching all Comments Under Each Post whenever this page renders
  useEffect(() => {
    const GetComments = async () => {
      try {
        const res = await axiosInstance.get("comments/" + post?._id);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetComments();
  }, [post?._id]);

  //Post a Comment
  const PostComment = async (e) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const details = {
        postId: post?._id,
        userId: user?._id,
        text,
      };
      try {
        const res = await axiosInstance.post("comments", details);
        setComments((prev) => [...prev, res.data]);
        setNumOfComments(numOfComments + 1);
        setText("");
        setPosting(false);

        //Updating Comments array in Post schema
        await axiosInstance.put("comments/comment/" + post?._id, {
          commentId: res.data._id,
        });

        //emiting comment notification to our socket server for real time update
        socket?.emit("commentNotification", {
          senderUsername: user?.username,
          receiverUsername: post?.username,
          postId: post?._id,
          message: "Commented on your post",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Register/Login to Leave a Comment");
    }
  };

  //fetchPost by cat
  useEffect(() => {
    const FetchRelatedPosts = async () => {
      try {
        const res = await axiosInstance.get(`posts?cat=${post?.categories[0]}`);
        setRelatedPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchRelatedPosts();
  }, [post?.categories]);

  //Number of related posts per post category
  useEffect(() => {
    const numberOfRelatedPosts = relatedPosts?.filter(
      (relatedPost) => relatedPost?._id !== post?._id
    );
    setNumOfRelatedPosts(numberOfRelatedPosts?.length);
  }, [relatedPosts, post?._id]);

  return (
    <div className="postPage">
      <div className="readPageWrapper">
        {post?.photo ? (
          <img src={post?.photo} alt="" className="postPageImage" />
        ) : (
          <MyReadPostImageLoader />
        )}
        <div className="titleAndIconsWrapper">
          {updateMode ? (
            <input
              className="updateTitlee"
              autoFocus={true}
              type="text"
              placeholder="Do not leave title blank"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          ) : (
            <h3 className="postPageTitle">
              {post?.title || <MyReadPostTitleLoader />}
            </h3>
          )}
          {user && post?.username === user.username && (
            <div className="postPageIcons">
              <EditIcon
                className="editIcon"
                onClick={() => setUpdateMode(true)}
              />
              <DeleteForeverOutlinedIcon
                className="deleteIcon"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        <div className="authorNameAndTimestamp">
          {updateMode ? (
            <button
              className="publishUpdate"
              disabled={isFetching}
              onClick={handleUpdate}
            >
              {isFetching ? <CircularProgress color="success" /> : "Update"}
            </button>
          ) : (
            <>
              <Link to={`/?user=${post?.username}`} className="links">
                {post?.username ? (
                  <span className="authorName">Author: {post?.username}</span>
                ) : (
                  <AuthorAndTimeStamp />
                )}
              </Link>
              {post?.createdAt && (
                <span className="timeS">
                  {new Date(post?.createdAt).toDateString()}
                </span>
              )}
            </>
          )}
        </div>
        {updateMode ? (
          <Editor
            initialValue={post?.description}
            apiKey="f9s9b5qra1it13jwl384beb6s3roxt0s6qj3j6k9pmv45ssx"
            init={{
              height: 300,
              width: "100%",
              menubar: true,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              fontsize_formats:
                "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onChange={(e) => setDescription(e.target.getContent())}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: post?.description }}
            className="postDescription"
          />
        )}
        {!post.description && (
          <div>
            <Description />
          </div>
        )}
        <hr style={{ marginTop: "20px", color: "gray" }} />
        <div className="mainCommentContainer">
          <div className="numberOfComments">
            {numOfComments && numOfComments > 0 ? (
              <h2>
                {numOfComments === 1
                  ? `${numOfComments} Comment`
                  : `${numOfComments} Comments`}
              </h2>
            ) : (
              "No comment on this post"
            )}
          </div>
          <div className="commentSection">
            {comments?.map((comment) => (
              <Comments
                comment={comment}
                key={comment?._id}
                post={post}
                setNumOfComments={setNumOfComments}
                numOfComments={numOfComments}
              />
            ))}
          </div>
          <form className="CommentForm">
            <textarea
              className="mainCommentTextArea"
              placeholder="Comment on this post"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button className="submitComment" onClick={PostComment}>
              {posting ? <CircularProgress color="success" /> : "Post"}
            </button>
          </form>
          <hr className="horizontalLine" />
          {numOfRelatedPosts > 0 && (
            <>
              <h1 className="relatedPostTitle">Related Posts</h1>
              <div className="relatedPostMainContainer">
                {relatedPosts?.map((relatedPost) => (
                  <RelatedPost
                    relatedPost={relatedPost}
                    key={relatedPost?._id}
                    postId={post?._id}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sidebarSection">
        {author?.length > 0 ? (
          <>
            {author?.map((a) => (
              <SidebarAuthor author={a} key={a._id} />
            ))}
          </>
        ) : (
          <div className="skeletonSidebar">
            <MySidebarDescriptionLoader />
            <MySidebarImageLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarDescriptionLoader />
            <MySidebarCategoryLoader />
            <MySidebarCategoriesLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Postpage;
