import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  loading: false,
  isRedirect: false,
};

export const userReducer = createReducer(initialState, {
  OtpRequest: (state) => {
    state.loading = true;
  },
  OtpSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isRedirect = true;
  },
  OtpFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isRedirect = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = true;
  },
  LogoutSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuthenticated = false;
  },
  LogoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  DeleteRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = true;
  },
  DeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuthenticated = false;
  },
  DeleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
});

export const allUserReducer = createReducer(initialState, {
  allUserRequest: (state) => {
    state.loading = true;
  },
  allUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const SearchUserReducer = createReducer(initialState, {
  SearchUserRequest: (state) => {
    state.loading = true;
  },
  SearchUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  SearchUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const UserProfileReducer = createReducer(initialState, {
  UserProfileRequest: (state) => {
    state.loading = true;
  },
  UserProfileSuccess: (state, action) => {
    state.loading = false;
    state.reqUser = action.payload;
  },
  UserProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const followUserReducer = createReducer(initialState, {
  FollowRequest: (state) => {
    state.loading = true;
  },
  FollowSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  FollowFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
