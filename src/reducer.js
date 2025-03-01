import {
  CLEAN_CART,
  REMOVE,
  DECREASE,
  INCREASE,
  DISPLAY_ITEM,
  LOADING,
} from './actions';
const reducer = (state, action) => {
  switch (action.type) {
    case CLEAN_CART:
      return { ...state, cart: new Map() };
    case REMOVE:
      const newCart = new Map(state.cart);
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
    case INCREASE:
      const cart = new Map(state.cart);
      const itemId = action.payload.id;
      let cartItem = cart.get(itemId);
      const newItem = { ...cartItem, amount: cartItem.amount + 1 };
      cart.set(itemId, newItem);
      return { ...state, cart: cart };
    default:
      throw new Error(`not matching action type: ${action.type}`);
  }
};

export default reducer;
