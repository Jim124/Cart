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
    case LOADING:
      return { ...state, loading: true };
    case DISPLAY_ITEM:
      const data = action.payload.data;
      const loadCart = new Map(data.map((item) => [item.id, item]));
      return { ...state, loading: false, cart: loadCart };
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
    case DECREASE:
      const decreaseCart = new Map(state.cart);
      const id = action.payload.id;
      const item = decreaseCart.get(id);
      if (item.amount == 1) {
        decreaseCart.delete(id);
        return { ...state, cart: decreaseCart };
      }
      const updateItem = {
        ...item,
        amount: item.amount - 1,
      };
      decreaseCart.set(id, updateItem);
      return { ...state, cart: decreaseCart };

    default:
      throw new Error(`not matching action type: ${action.type}`);
  }
};

export default reducer;
