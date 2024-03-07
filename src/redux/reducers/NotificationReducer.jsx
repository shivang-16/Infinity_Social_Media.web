import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    notifications: []
};

export const getNotificationReducer = createReducer(initialState, {
  GetNotificationRequest: (state) => {
    state.loading = true;
  },
  GetNotificationSuccess: (state, action) => {
    state.loading = false;
    state.notifications = action.payload;
  },
  GetNotificationFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const geUnreadNotificationReducer = createReducer(initialState, {
  GetUnreadRequest: (state) => {
    state.loading = true;
  },
  GetUnreadSuccess: (state, action) => {
    state.loading = false;
    state.notifications = action.payload;
  },
  GetUnreadFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});