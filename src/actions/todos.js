import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_CHECKED,
} from './index';

export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload
    }
}

export const removeTodo = (payload) => {
    return {
        type: REMOVE_TODO,
        payload
    }
}

export const toggleChecked = (payload) => {
    return {
        type: TOGGLE_CHECKED,
        payload
    }
}