import React, { useState, useContext, useEffect, useReducer } from "react";
import { useCallback } from "react";
import reducer from "./reducer";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const initialValues = {
  searchTerm: "",
  cocktails: [],
  loading: true,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const fetchDrinks = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${url}${state.searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
            strCategory,
            strInstructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = item;

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
            category: strCategory,
            instructions: strInstructions,
            ingredients: ingredients,
          };
        });
        dispatch({ type: "UPDATE_COCKTAILS", payload: newCocktails });
      } else {
        dispatch({ type: "UPDATE_COCKTAILS", payload: [] });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.searchTerm]);

  const setSearchTerm = (value) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
  };

  useEffect(() => {
    fetchDrinks();
  }, [state.searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
