import axios from "axios";
import { server } from "../../main";

export const getAllNotifications = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetNotificationRequest",
    });

    const { data } = await axios.get(`${server}/notification/all`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetNotificationSuccess",
      payload: data.notifications,
    });
  } catch (error) {
    dispatch({
      type: "GetNotificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUnreadNotifications = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetUnreadRequest",
    });

    const { data } = await axios.get(`${server}/notification/all?status=true`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetUnreadSuccess",
      payload: data.notifications,
    });
  } catch (error) {
    dispatch({
      type: "GetUnreadFailure",
      payload: error.response.data.message,
    });
  }
};
