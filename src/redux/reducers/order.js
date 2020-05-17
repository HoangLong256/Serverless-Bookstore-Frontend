import * as actionTypes from '../actions/actionTypes'; 
const intitialState = {
    orders: [],
    totalPrice: 0
};

const reducer = (state = intitialState, action) =>{
    switch(action.type){
        case actionTypes.GET_ORDER:
            return state
        case actionTypes.ADD_ITEM:
            const orderIndex = state.orders.findIndex(item => item.id === action.item.id);
            let newPrice = parseInt(state.totalPrice)+ parseInt(action.item.price);
            newPrice = newPrice.toFixed(0);
            if(orderIndex !== -1){
                const newOrders = [...state.orders];
                newOrders[orderIndex].quantity += action.item.quantity;
                return{
                    ...state, 
                    orders: newOrders,
                    totalPrice: newPrice
                }
            }else{
                return{
                    ...state, 
                    orders: state.orders.concat(action.item),                    
                    totalPrice: newPrice

                }
            }
        case actionTypes.REMOVE_ITEM:
            console.log('Get Here')
            const index = state.orders.findIndex(item => item.id === action.id);
            console.log(index)
            let nPrice = parseInt(state.totalPrice) - parseInt(state.orders[index].price);
            nPrice = nPrice.toFixed(0);
            let nOrders = [...state.orders]
            nOrders.splice(index,1)
            console.log(nOrders);
            console.log(nPrice);
            return{
                ...state,
                orders: nOrders,
                totalPrice: nPrice
            };
        case actionTypes.CLEAR_ORDER:
            return{
                orders: [],
                totalPrice: 0
            }
        

        default:
            return state
    }
}

export default reducer;
