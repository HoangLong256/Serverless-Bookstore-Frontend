import * as actionTypes from '../actions/actionTypes'; 
const intitialState = {
    loginStatus: false
};

const reducer = (state = intitialState, action) =>{
    switch(action.type){
        case actionTypes.LOGIN_SUCCESSFUL:
            return{
                ...state,
                loginStatus: true
        };
        case actionTypes.LOGOUT:
            return{
                ...state,
                loginStatus: false
            }
        default:
            return state;
    }
}
export default reducer;
