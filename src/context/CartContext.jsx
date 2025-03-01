import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer';
import {
  CLEAN_CART,
  REMOVE,
  DECREASE,
  INCREASE,
  LOADING,
  DISPLAY_ITEM,
} from '../actions';
import cartItems from '../data';
const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearCart = () => {
    dispatch({ type: CLEAN_CART });
  };
  return (
    <AppContext.Provider value={{ ...state, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useCartContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('provide was used out of service');
  return context;
};
