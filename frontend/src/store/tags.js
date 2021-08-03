import { csrfFetch } from "./csrf";

const SET_TAGS = "tags/SET"
const UNSET_TAGS = "tags/UNSET"

const load = (tags) => ({
    type: SET_TAGS,
    payload: tags
});

const logout = () => {
    return {
        type: UNSET_TAGS
    }
}


export const setTags = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/tags/${userId}`);
    if (!response.ok) {
      throw response;
    }
    const tags = await response.json();

    dispatch(load(tags));
}

export const logoutTags = () => async (dispatch) => {
    dispatch(logout());
  };

const initialState = {};
//REDUCERS
const tagsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        
        case SET_TAGS:
            action.payload.forEach((tag) => {
                // console.log(action.payload)
                newState[tag.id] = tag;
            });
            return newState;
        case UNSET_TAGS:
            return newState;
        
        default:
            return state;
    }
}

export default tagsReducer;