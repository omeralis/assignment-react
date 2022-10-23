import { configureStore, combineReducers, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userSlice from "../features/UserSlice";
const rootReducer = combineReducers({
  user: userSlice
});

const store = configureStore(
  {
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
  },
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
    compose
);

export default store;

// export default configureStore({
//   reducer: {
//     user: userSlice
//   }
// });

//https://github.com/rt2zz/redux-persist/issues/613
