import { configureStore } from "@reduxjs/toolkit";
import { userReducer, allUserReducer } from "./reducers/UserReducer";
import { postReducer } from "./reducers/PostReducer";
import { UserProfileReducer } from "./reducers/UserReducer";
import { myPostReducer } from "./reducers/PostReducer";
import { UserPostReducer } from "./reducers/PostReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        users: allUserReducer,
        userProfile: UserProfileReducer,
        post: postReducer,
        myposts: myPostReducer,
        userposts: UserPostReducer,
    }
});

export default store;