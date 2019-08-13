import initialState from './initialState';
import * as actionType from './actionTypes';


const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.GET_USERS_SUCCESS :
            return {
                ...state,
                listOfUsers: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;