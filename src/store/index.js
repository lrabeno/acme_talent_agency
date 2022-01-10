import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger";
import { clients } from "./clients";
import { skills } from "./skills";



const reducer = combineReducers({
    clients,
    skills
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store