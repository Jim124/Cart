import { createContext, useContext, useEffect, useReducer } from 'react';
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
import { getTotals } from '../utils';
const AppContext = createContext();

const url = 'https://www.course-api.com/react-useReducer-cart-project';
const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);
  const clearCart = () => {
    dispatch({ type: CLEAN_CART });
  };
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: DISPLAY_ITEM, payload: { data } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
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
