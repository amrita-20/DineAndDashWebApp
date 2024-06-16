import { ACTIONS } from "./constant";

export const initialState = {
  menu: [],
  filteredMenu: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    case ACTIONS.FILTER_MENU:
      return {
        ...state,
        filteredMenu: action.payload // not really payload, but apply filter
      };

    default:
      return state;
  }
}

export default reducer;
