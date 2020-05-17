import * as actionTypes from '../actions/actionTypes'; 
const intitialState = {
    product: []
};

const reducer = (state = intitialState, action) =>{
    switch(action.type){
        case actionTypes.GET_PRODUCT:
            return state
        case actionTypes.ADD_PRODUCT:
            return {
                ...state,
                product: action.productData
            }
        default:
            return state
    }
}

export default reducer;