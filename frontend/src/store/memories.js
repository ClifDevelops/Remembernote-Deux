import { csrfFetch } from "./csrf";

const SET_MEMORY = "memory/GET";
const ADD_MEMORY = "memory/ADD";
const DELETE_MEMORY = "memory/DELETE";
const UNSET_MEMORIES = "memories/UNSET";
const SET_MEMORIES = "memories/SET"


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
//THUNKS (Async Actions)


export const setMemories = () => async dispatch => {
    const response = await csrfFetch(`/api/memories`);
    if (!response.ok) {
      throw response;
    }
    const memories = await response.json();
    // console.log(memories)
    dispatch(load(memories));
}

export const logoutMemories = () => async (dispatch) => {
  dispatch(logout());
};

export const createMemory = payload => async dispatch => {
    const response = await csrfFetch(`/api/memories`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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
    const response = await csrfFetch(`/api/memories/tag`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const tag = await response.json();
        console.log(tag, payload.memoryId)
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
                // console.log(memory.Tags)
                newState[memory.id] = memory;
            });
            return newState;
        case UNSET_MEMORIES:
            return newState;

        
        default:
            return state;
    }
}

export default memoriesReducer;