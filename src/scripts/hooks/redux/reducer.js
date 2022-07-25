/* eslint-disable default-param-last */
import initialState from './initialState';
import * as actions from './actions';

export default function reducer(state = initialState, action) {
    // console.log(action);
    // console.log(state);
    switch (action.type) {
        case actions.ADD_CONTACT:
            return [...state, action.payload];

        case actions.EDIT_CONTACT:
            return state.map((v) =>
                v.id === action.payload.id ? action.payload : v
            );

        case actions.DELETE_CONTACT:
            return state.filter((contact) => contact.id !== action.payload);

        default:
            return state;
    }
}
