
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
export const setMemoryContent = (id) => {
    return {
        type: SET_CONTENT,
        payload: id
    }
}



const initialState = {setting: '', memoryId: 1};
const mainContentReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case SET_EDITOR:
            newState.setting = 'editor';
            newState.memoryId = 0;
            return newState;
        case SET_CARDS:
            newState.setting = 'cards';
            newState.memoryId = 0;
            return newState;
        case SET_CONTENT:
            newState.setting = 'content';
            newState.memoryId = action.payload
            return newState;
        default:
            return state;
    }
}

export default mainContentReducer;