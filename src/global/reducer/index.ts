export function cartReducer(state:any, action:any){
    if (action.payload === "addToCart")
    {
        return{
            cart :[...state.cart, action.data]
        }
    } else if (action.payload === "removeFromCart"){
      return  "" 
    }
    else if (action.payload === "updateTheCart"){
        return state;
      }
    
    return state;
    }
