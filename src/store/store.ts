import { legacy_createStore } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import rootReducer, { RootState } from "./reducers.ts";

const store = legacy_createStore(rootReducer);

export type Dispatch = ThunkDispatch<RootState, void, Action>;

export default store;
