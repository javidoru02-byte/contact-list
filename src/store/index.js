import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import reducer from "./reducers/contactReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middleware = applyMiddleware(sagaMiddleware, logger);

const store = createStore(reducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSaga);

export default store;