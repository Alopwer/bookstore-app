import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const logMiddleware = (store) => (dispatch) => (action) => {
    console.log(action.type, store.getState())
    return dispatch(action)
}

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }

    return dispatch(action)
}

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    stringMiddleware, 
    logMiddleware))

const myActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout)
}

store.dispatch(myActionCreator(2000))

export default store;