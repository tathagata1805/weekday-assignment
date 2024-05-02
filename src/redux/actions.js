import { SET_FILTER } from './actionTypes';

export const setFilter = (filterName, value) => ({
    type: SET_FILTER,
    payload: { filterName, value }
});
