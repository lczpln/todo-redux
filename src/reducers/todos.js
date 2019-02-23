const InitialState = {
    todos: []
}


export default function todos(state = InitialState.todos, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [{id: Math.random(), text: action.payload, done: false}, ...state];
        case 'REMOVE_TODO':
            return [...state.filter(todo => (todo.id !== action.payload))];
        case 'TOGGLE_CHECKED':
            return [...state.map(todo => todo.id === action.payload ? {id: todo.id, text: todo.text, done: !todo.done} : todo)]      
        default:
        return state;
    }
}