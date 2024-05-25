import { ACTIONS } from "./constant";

export const initialState = {
    menu: [],
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.LOAD_MENU:
            return {
                ...state,
                menu: action.payload
            }
        default: 
            return state;
    }
}

export default reducer;