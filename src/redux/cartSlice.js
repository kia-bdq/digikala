import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartArray: [],
    count :0,
    sum: 0
  },

  reducers: {

    addToCart: (state, product) => {
      if(!state.cartArray.some(pd => pd.id === product.payload.id)){
        state.cartArray.push(product.payload);
      }else{
        state.cartArray.find(pd => pd.id === product.payload.id).count += 1;
      }
      state.count+=1;
      state.sum += product.payload.price;
    },

    removeFromCart: (state, product) =>{
      const toDelete = state.cartArray[product.payload];
      state.count -= toDelete.count;
      state.sum -= toDelete.count * toDelete.price;
      state.cartArray.splice(product.payload, 1);
     

    },

    increment: (state, rowNum) => {
      state.cartArray[rowNum.payload].count += 1;
      state.count += 1;
      state.sum += state.cartArray[rowNum.payload].price;
    },

    decrement: (state, rowNum) => {
      state.cartArray[rowNum.payload].count -= 1;
      state.count -= 1;
      state.sum -= state.cartArray[rowNum.payload].price;
    },
    
  }
})

export const { addToCart,removeFromCart, increment, decrement} = cartSlice.actions

export default cartSlice.reducer