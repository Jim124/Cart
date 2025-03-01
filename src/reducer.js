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

    default:
      throw new Error(`not matching action type: ${action.type}`);
  }
};

export default reducer;
