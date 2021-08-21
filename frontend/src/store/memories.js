import { csrfFetch } from "./csrf";

const SET_MEMORY = "memory/GET";
const ADD_MEMORY = "memory/ADD";
const DELETE_MEMORY = "memory/DELETE";
const UNSET_MEMORIES = "memories/UNSET";
const SET_MEMORIES = "memories/SET"
const ADD_TAG = "tags/ADD"


//ACTIONS


const load = (memories) => ({
    type: SET_MEMORIES,
    payload: memories
});

const addMemory = (memory) => ({
    type: ADD_MEMORY,
    payload: memory,
});

const logout = () => {
    return {
        type: UNSET_MEMORIES
    }
}

const addTagToStore = (tag, memoryId) => ({
    type: ADD_TAG,
    payload: tag, memoryId
})
//THUNKS (Async Actions)

export const setMemory = (id) => async dispatch => {
    const response = await csrfFetch(`/api/memories/${id}`)
    if (!response.ok) {
        throw response;
    }
    const memory = await response.json();
    console.log(memory)
    dispatch(addMemory(memory));
    return memory;
}
export const setMemories = () => async dispatch => {
    const response = await csrfFetch(`/api/memories`);
    if (!response.ok) {
      throw response;
    }
    const memories = await response.json();
    // console.log("------------------",memories)
    dispatch(load(memories));
}

export const setTaggedMemories = (tagId) => async dispatch => {
    console.log('Here is the tagId', tagId)
    const response = await csrfFetch(`/api/tags/${tagId}`);
    if (!response.ok) {
        throw response;
    }
    const memories = await response.json();
    console.log(memories)
    dispatch(load(memories))
}

export const logoutMemories = () => async (dispatch) => {
  dispatch(logout());
};

export const createMemory = payload => async dispatch => {
    const {title, dateOfMemory, location, memoryRating, image, body, userId} = payload;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('dateOfMemory', dateOfMemory);
    formData.append('location', location);
    formData.append('memoryRating', memoryRating);
    formData.append('body', body);
    formData.append('userId', userId);
    if (image) formData.append("image", image);
    const response = await csrfFetch(`/api/memories`, {
        method: 'post',
        headers: {
            'Content-Type': "multipart/form-data",
        },
        body: formData
    });

    if (response.ok) {
        const memory = await response.json();
        dispatch(addMemory(memory));
        return memory;
    }
}

export const updateMemory = data => async dispatch => {
    const response = await csrfFetch(`/api/memories/edit`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const memory = await response.json();
        dispatch(addMemory(memory));
        return memory;
    }
}

export const addTag = payload => async dispatch => {
    const response = await csrfFetch(`/api/tags`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const tag = await response.json();
        const memoryId = parseInt(payload.memoryId, 10)
        // console.log(tag, payload.memoryId)
        dispatch(addTagToStore(tag, memoryId))
        return tag;
    }
}

export const deleteTag = payload => async dispatch => {
    const response = await csrfFetch(`/api/tags/delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        return {}
    }
    
}


const initialState = {};
//REDUCERS
const memoriesReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case SET_MEMORY:
            return
        case ADD_MEMORY:
            state[action.payload.id] = action.payload;
            return state;
        case SET_MEMORIES:
            action.payload.forEach((memory) => {
                // console.log(memory)
                newState[memory.id] = memory;
            });
            return newState;
        case UNSET_MEMORIES:
            return newState;
        case ADD_TAG:
            // console.log('HERE IS THE TAG', action.tag)
            // console.log('Here is the memoryId', action.payload.memoryId)
            // console.log(state[action.memoryId])
            // state[action.memoryId].Tags.push(action.tag)
            return state
        
        default:
            return state;
    }
}

export default memoriesReducer;