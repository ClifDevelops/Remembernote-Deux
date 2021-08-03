import { csrfFetch } from "./csrf";

const SET_TAGS = "tags/SET"
const UNSET_TAGS = "tags/UNSET"

const load = (tags) => ({
    type: SET_TAGS,
    payload: tags
});

export const setTags = () => async dispatch => {
    const response = await csrfFetch(`/api/tags`);
    if (!response.ok) {
      throw response;
    }
    const tags = await response.json();
    // console.log("------------------",memories)
    dispatch(load(tags));
}

const initialState = {};
//REDUCERS
const tagsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        
        case SET_TAGS:
            action.payload.forEach((memory) => {
                // console.log(action.payload)
                newState[memory.id] = memory;
            });
            return newState;
        case UNSET_TAGS:
            return newState;
        
        default:
            return state;
    }
}

export default tagsReducer;