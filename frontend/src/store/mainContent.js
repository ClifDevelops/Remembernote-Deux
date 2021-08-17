
const SET_EDITOR = "editor/SET"
const SET_CARDS = "cards/SET"
const SET_CONTENT = "content/SET"

export const setTextEditor = () => {
    return {
        type: SET_EDITOR
    }
}

export const setMemoryCards = () => {
    return {
        type: SET_CARDS
    }
}
export const setMemoryContent = () => {
    return {
        type: SET_CONTENT
    }
}



const initialState = {};
const mainContentReducer = (state = initialState, action) => {
    let newState = [];
    switch(action.type) {
        case SET_EDITOR:
            newState.push('editor');
            return newState;
        case SET_CARDS:
            newState.push('cards');
            return newState;
        case SET_CONTENT:
            newState.push('content');
            return newState;
        default:
            return state;
    }
}

export default mainContentReducer;