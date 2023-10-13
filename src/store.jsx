import { configureStore } from "@reduxjs/toolkit";
import { userReducer, allUserReducer } from "./reducers/UserReducer";
import { postReducer } from "./reducers/PostReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        users: allUserReducer,
        post: postReducer
    }
});

export default store;