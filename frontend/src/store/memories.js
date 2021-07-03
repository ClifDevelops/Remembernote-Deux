import { csrfFetch } from "./csrf";

const SET_MEMORY = "memory/GET";
const ADD_MEMORY = "memory/ADD";
const DELETE_MEMORY = "memory/DELETE";
const UNSET_MEMORIES = "memories/UNSET";
const SET_MEMORIES = "memories/SET"


//ACTIONS
// const setMemory = (memory) => ({
//   type: SET_MEMORY,
//   payload: memory,
// });

const load = (memories) => ({
    type: SET_MEMORIES,
    payload: memories
});

const addMemory = (memory) => ({
    type: ADD_MEMORY,
    payload: memory,
});

const unset = () => {
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
    dispatch(load(memories));
}

export const unsetMemories = () => async (dispatch) => {
  
  dispatch(unset());
};

export const createMemory = data => async dispatch => {
    console.log(data);
    const response = await csrfFetch(`/api/memories`, {
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

export const updateMemory = data => async dispatch => {
    console.log(data);
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
                newState[memory.id] = memory;
            });
            return newState;
        case UNSET_MEMORIES:
            newState.memories = {};
            return newState;

        
        default:
            return state;
    }
}

export default memoriesReducer;