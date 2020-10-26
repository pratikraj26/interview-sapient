import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk"
import reducer from "~/redux/reducers";

const store = createStore(
	reducer,
	compose(applyMiddleware(thunk))
);

export default store;
