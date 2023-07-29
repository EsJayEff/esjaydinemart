function checkAndReturnExistingProduct(originalData:any , newData:any){
for (let index=0; index < originalData.length; index++)
  {
    const element = originalData[index];
    if (element.productId == newData.productId)
    {
      return element
    }
  }
}


export function cartReducer(state:any, action:any){
if (action.payload === "addToCart") {
    let response = checkAndReturnExistingProduct(state.cart, action.data);
    if (!response){
      console.log("Empty added one", action.data)
        return{
            cart :[...state.cart, action.data]
        }
 } else{
        let dataToStoreAgain = state.cart.filter((item:any)=> item.productId !== response.productId)
        console.log("Storing Again",dataToStoreAgain,action.data)
              return {
                    cart:[...dataToStoreAgain, action.data]
              }
        }
   

    } else if (action.payload === "removeFromCart"){
      return  "" 
    }
    else if (action.payload === "updateTheCart"){
      return state;
      }
    
    return state;
    }
