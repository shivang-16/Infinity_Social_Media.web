import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

export const createPost = (myForm) => async (dispatch) => {
  try {
    dispatch({
      type: "CreatePostRequest",
    });
    const { data } = await axios.post(`${server}/post/create`, myForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    sessionStorage.removeItem("post")

    dispatch({
      type: "CreatePostSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "CreatePostFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPostRequest",
    });

    let cachedPosts = sessionStorage.getItem("post")
    if(cachedPosts) {
      let post = await JSON.parse(cachedPosts)
      dispatch({
        type: "GetPostSuccess",
        payload: post,
      });
    } else {

    const { data } = await axios.get(`${server}/post/allposts`, {
      withCredentials: true,
    });

    sessionStorage.setItem("post", JSON.stringify(data.post))

    dispatch({
      type: "GetPostSuccess",
      payload: data.post,
    });
  }
  } catch (error) {
    dispatch({
      type: "GetPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "FollowingPostsRequest",
    });

    let cachedPosts = sessionStorage.getItem("FollowingPosts")
    if(cachedPosts) {
      let posts = await JSON.parse(cachedPosts)
      dispatch({
        type: "FollowingPostsSuccess",
        payload: posts,
      });
    } else {


    const { data } = await axios.get(`${server}/post/following`, {
      withCredentials: true,
    });

    sessionStorage.setItem("FollowingPosts", JSON.stringify(data.posts))

    dispatch({
      type: "FollowingPostsSuccess",
      payload: data.posts,
    });
  }
  } catch (error) {
    dispatch({
      type: "FollowingPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostRequest",
    });

    let cachedPosts = sessionStorage.getItem("MyPosts")
    if(cachedPosts) {
      let posts = await JSON.parse(cachedPosts)
      dispatch({
        type: "MyPostSuccess",
        payload: posts,
      });
    }

    const { data } = await axios.get(`${server}/user/me/posts`, {
      withCredentials: true,
    });

    sessionStorage.setItem("MyPosts", JSON.stringify(data.posts))

    dispatch({
      type: "MyPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "MyPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyBookmark = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostRequest",
    });

    let cachedPosts = sessionStorage.getItem("MyBookmarks")
    if(cachedPosts) {
      let posts = await JSON.parse(cachedPosts)
      dispatch({
        type: "MyPostSuccess",
        payload: posts,
      });
    }

    const { data } = await axios.get(`${server}/user/me/bookmarks`, {
      withCredentials: true,
    });

    sessionStorage.setItem("MyBookmarks", JSON.stringify(data.posts))

    dispatch({
      type: "MyPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "MyPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPost = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "UserPostRequest",
    });

    const { data } = await axios.get(`${server}/user/posts/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "UserPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "UserPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPostById = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetPostByIDRequest",
    });

    const { data } = await axios.get(`${server}/post/${postId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetPostByIDSuccess",
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: "GetPostByIDFailure",
      payload: error.response.data.message,
    });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "GeneralRequest",
    });

    sessionStorage.removeItem("FollowingPosts");
    sessionStorage.removeItem("MyPosts");
    sessionStorage.removeItem("MyBookmarks");
    sessionStorage.removeItem("post")

    const { data } = await axios.get(`${server}/post/likes/${postId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GeneralSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "GeneralFailure",
      payload: error.response.data.message,
    });
  }
};

export const commentPost =
  ({ postId, comment }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "GeneralRequest",
      });

      sessionStorage.removeItem("FollowingPosts");
      sessionStorage.removeItem("MyPosts");
      sessionStorage.removeItem("MyBookmarks");
      sessionStorage.removeItem("post")

      const { data } = await axios.post(
        `${server}/post/comments/${postId}`,
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
 

      dispatch({
        type: "GeneralSuccess",
        payload: data.message,
      });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: "GeneralFailure",
        payload: error.response.data.message,
      });
    }
  };

export const bookmarkPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "GeneralRequest",
    });

    sessionStorage.removeItem("FollowingPosts");
    sessionStorage.removeItem("MyPosts");
    sessionStorage.removeItem("MyBookmarks");
    sessionStorage.removeItem("post")

    const { data } = await axios.get(`${server}/post/bookmark/${postId}`, {
      withCredentials: true,
    });


    dispatch({
      type: "GeneralSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "GeneralFailure",
      payload: error.response.data.message,
    });
  }
};

export const editPost =
  ({ postId, caption }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "GeneralRequest",
      });

      const { data } = await axios.patch(
        `${server}/post/${postId}`,
        {
          caption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      dispatch({
        type: "GeneralSuccess",
        payload: data.message,
      });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: "GeneralFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "GeneralRequest",
    });

    const { data } = await axios.delete(`${server}/post/${postId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GeneralSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "GeneralFailure",
      payload: error.response.data.message,
    });
  }
};
