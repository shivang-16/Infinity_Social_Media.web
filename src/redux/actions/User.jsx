import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../main";

export const sinupUser =
  (name, userName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "OtpRequest",
      });
      const { data } = await axios.post(
        `${server}/user/register`,
        {
          name,
          userName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      dispatch({
        type: "OtpSuccess",
        payload: data.message,
      });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: "OtpFailure",
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

export const verifyOtp = (otp) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });
    const { data } = await axios.post(
      `${server}/user/verify`,
      {
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "RegisterFaliure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const loginUser = (loginIdentifier, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      `${server}/user/login`,
      {
        loginIdentifier,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "LoginFaliure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

  let cachedUsers = sessionStorage.getItem("MyProfile")
  if(cachedUsers) {
    let user = await JSON.parse(cachedUsers)
    dispatch({
      type: "LoadUserSuccess",
      payload: user,
    });
  }

    const { data } = await axios.get(`${server}/user/myProfile`, {
      withCredentials: true,
    });

  sessionStorage.setItem("MyProfile", JSON.stringify(data.user))

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });

    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "LogoutSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getAllUser =
  ({ limit = 8, page = 1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUserRequest",
      });

      let cacheKey = `Users_page_${page}`;
      let cachedUsers = sessionStorage.getItem(cacheKey);
  
      if (cachedUsers) {
        let users = JSON.parse(cachedUsers);
        dispatch({
          type: "allUserSuccess",
          payload: users,
        });
      } else {

      let { data } = await axios.get(
        `${server}/user/allusers?limit=${limit}&page=${page}`,
        {
          withCredentials: true,
        },
      );
      
      sessionStorage.setItem(cacheKey, JSON.stringify(data.users))

      dispatch({
        type: "allUserSuccess",
        payload: data.users,
      });
    }
    } catch (error) {
      dispatch({
        type: "allUserFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getUserProfile = (userName) => async (dispatch) => {
  try {
    dispatch({
      type: "UserProfileRequest",
    });

    let { data } = await axios.get(`${server}/user/${userName}`, {
      withCredentials: true,
    });
    dispatch({
      type: "UserProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "UserProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const SearchUserProfile = (serachQuery) => async (dispatch) => {
  try {
    dispatch({
      type: "SearchUserRequest",
    });

    let { data } = await axios.get(
      `${server}/user/search?userName=${serachQuery}&name=${serachQuery}`,
      {
        withCredentials: true,
      },
    );
    dispatch({
      type: "SearchUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "SearchUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const followUser = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowRequest",
    });
    let { data } = await axios.get(`${server}/follow/${_id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "FollowSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "FollowFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const editUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "GeneralRequest",
    });
    const { data } = await axios.patch(`${server}/user/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
    toast.error(error.response.data.message);
  }
};

export const deleteAvatar = () => async (dispatch) => {
  try {
    dispatch({
      type: "GeneralRequest",
    });
    const { data } = await axios.get(`${server}/user/deleteAvatar`, {
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
    toast.error(error.response.data.message);
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteRequest",
    });
    const { data } = await axios.delete(`${server}/user/delete`, {
      withCredentials: true,
    });
    dispatch({
      type: "DeleteSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "DeleteFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "GeneralRequest",
    });

    const { data } = await axios.post(
      `${server}/user/forgetPassword`,
      {
        email,
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
    toast.error(error.response.data.message);
  }
};

export const changePassword =
  (email, otp, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "GeneralRequest",
      });
      const { data } = await axios.post(
        `${server}/user/changePassword`,
        {
          email,
          otp,
          newPassword,
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
      toast.error(error.response.data.message);
    }
  };
