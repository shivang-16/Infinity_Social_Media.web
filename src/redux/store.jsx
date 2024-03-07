import { configureStore } from "@reduxjs/toolkit";
import { userReducer, allUserReducer } from "./reducers/UserReducer";
import { postReducer } from "./reducers/PostReducer";
import { UserProfileReducer } from "./reducers/UserReducer";
import { myPostReducer } from "./reducers/PostReducer";
import { UserPostReducer } from "./reducers/PostReducer";
import { GetPostByIDReducer } from "./reducers/PostReducer";
import { followingPostsReducer } from "./reducers/PostReducer";
import { SearchUserReducer } from "./reducers/UserReducer";
import { getNotificationReducer, geUnreadNotificationReducer } from "./reducers/NotificationReducer";
import LoadingBarReducer from "./reducers/LoadingBar";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: allUserReducer,
    userProfile: UserProfileReducer,
    searchUser: SearchUserReducer,
    post: postReducer,
    followingPosts: followingPostsReducer,
    myposts: myPostReducer,
    userposts: UserPostReducer,
    postById: GetPostByIDReducer,
    loadingBar: LoadingBarReducer,
    notifications: getNotificationReducer,
    unread: geUnreadNotificationReducer
  },
});

export default store;
