import { SET_FILTER } from "./actionTypes";

const initialState = {
  role: [],
  numberOfEmployees: [],
  experience: [],
  mode: [],
  minimumSalary: [],
  companyName: "",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      const { filterName, value } = action.payload;
      return {
        ...state,
        [filterName]: value,
      };
    default:
      return state;
  }
};

export default filtersReducer;
