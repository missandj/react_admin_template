import { createStore, combineReducers, applyMiddleware } from "redux";
// 引入redux-thunk
// redux-thunk是用来发送异步请求的中间件，用了thunk之后，
// 一般的操作是将网络请求的方法放在action中，后面会有说明
import thunk from "redux-thunk";
// redux-logger打印logger的中间件，具体效果可以看下图
import logger from "redux-logger";
// import nameReducer from "./reducers/reducer";

const rootReducer = combineReducers({
//     nameReducer
});
const initiaLizeState = {};
// 定义中间件的数组
const middleware = [logger, thunk];
const store = createStore(
    rootReducer,
    initiaLizeState,
    // 通过applyMiddleware将中间件添加
    applyMiddleware(...middleware)
);
export default store;
