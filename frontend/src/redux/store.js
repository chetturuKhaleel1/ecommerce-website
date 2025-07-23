import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './features/auth/authSlice'
//using favrptie redicer
import favoritesReducer from '../redux/features/auth/favorites/favoriteSlice'
import cartSliceReducer from  '../redux/features/cart/cartSlice'
import { getFavoritesFromLocalStorage} from '../Utils/localStorage'
import  shopReducer from '../redux/features/shop/shopSlice'


const initialFavorites =getFavoritesFromLocalStorage() || []





// 1. Configure the Redux store
const store = configureStore({
  reducer: {
    // Add the API slice reducer under its path
    [apiSlice.reducerPath]: apiSlice.reducer,

    //

    auth:authReducer,
   favorites: favoritesReducer,
   cart:cartSliceReducer,
   shop:shopReducer,
  },


  //predload state

preloadedState :{
  favorites:initialFavorites
},




  // 2. Extend the middleware to include the API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // 3. Enable Redux DevTools
  devTools: true,
});

// 4. Set up automatic refetching for queries (like polling or focus events)
setupListeners(store.dispatch);

export default store;
