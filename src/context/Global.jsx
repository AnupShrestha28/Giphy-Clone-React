import React, { useContext, useEffect, useReducer } from "react";
import { globalReducer } from "../reducers/GlobalReducer";
import axios from "axios";
import {
  ADD_TO_FAVOURITES,
  GET_FAVOURITES,
  GET_RANDOM,
  GET_SEARCH,
  GET_TRENDING,
  LOADING,
} from "../utils/GlobalActions";

const apiKey = import.meta.env.REACT_APP_API_KEY;
const baseURL = "https://api.giphy.com/v1/gifs";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = {
    loading: false,
    searchResults: [],
    trending: [],
    favourites: [],
    random: {},
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Get trending Gifs
  const getTrending = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseURL}/trending?api_key=${apiKey}&limit=30`
    );

    dispatch({ type: GET_TRENDING, payload: res.data.data });
  };

  // Random GIFF
  const randomGiff = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(`${baseURL}/random?api_key=${apiKey}`);
    dispatch({ type: GET_RANDOM, payload: res.data.data });
  };

  // Search
  const searchGiffs = async (query) => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseURL}/search?api_key=${apiKey}&q=${query}&limit=18`
    );
    dispatch({ type: GET_SEARCH, payload: res.data.data });
  };

  // Save to favs
  const saveToFavourites = (gif) => {
    const storedItems =
      JSON.parse(window.localStorage.getItem("myFavourites")) || [];

    const existingItem = storedItems.find((item) => item?.id === gif?.id);

    if (!existingItem) {
      const items = [...storedItems, gif];
      window.localStorage.setItem("myFavourites", JSON.stringify(items));

      dispatch({ type: ADD_TO_FAVOURITES, payload: gif });

      alert("Added to favourites");
    } else {
      alert("Already added to favourites");
    }
  };

  const removeFromLocalStorage = (gif) => {
    const storedItems =
      JSON.parse(window.localStorage.getItem("myFavourites")) || [];

    const items = storedItems?.filter((item) => item?.id !== gif?.id);

    window.localStorage.setItem("myFavourites", JSON.stringify(items));

    // get updated list
    getFromLocalStorage();
  };

  const getFromLocalStorage = () => {
    const storedItems =
      JSON.parse(window.localStorage.getItem("myFavourites")) || [];
    dispatch({ type: GET_FAVOURITES, payload: storedItems });
  };

  // Initial renders
  useEffect(() => {
    getTrending();
    randomGiff();
    getFromLocalStorage();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        randomGiff,
        searchGiffs,
        saveToFavourites,
        removeFromLocalStorage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
