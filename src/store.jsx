import { configureStore } from "@reduxjs/toolkit";
import { userReducer, allUserReducer } from "./reducers/UserReducer";
import { postReducer } from "./reducers/PostReducer";
import { UserProfileReducer } from "./reducers/UserReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        users: allUserReducer,
        post: postReducer,
        userProfile: UserProfileReducer
    }
});

export default store;