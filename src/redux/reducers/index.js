import {combineReducers} from "redux";
import maineReducer from "./mainReducer"

const reducers = combineReducers({
    main: maineReducer
})

export default reducers