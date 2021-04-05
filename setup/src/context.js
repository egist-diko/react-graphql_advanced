import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import reducer from "./reducer";
import { useQuery, gql } from "@apollo/client";

const COCKTAILS_QUERY = gql`
  query CocktailsQuery($strDrink: String) {
    cocktails(strDrink: $strDrink) {
      drinks {
        idDrink
        strDrink
        strDrinkThumb
        strAlcoholic
        strCategory
        strGlass
        strInstructions
        strIngredient1
        strIngredient2
        strIngredient3
        strIngredient4
        strIngredient5
      }
    }
  }
`;

const AppContext = React.createContext();

const initialValues = {
  searchTerm: "",
  cocktails: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { data, loading, error } = useQuery(COCKTAILS_QUERY, {
    variables: { strDrink: state.searchTerm },
  });

  const fetchDrinks = () => {
    if (!loading) {
      console.log(state.searchTerm);
      const { drinks } = data.cocktails;
      console.log(drinks);
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        dispatch({ type: "UPDATE_COCKTAILS", payload: newCocktails });
      } else {
        dispatch({ type: "UPDATE_COCKTAILS", payload: [] });
      }
    }
  };

  const setSearchTerm = (value) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
  };

  useEffect(() => {
    fetchDrinks();
  }, [loading, state.searchTerm]);

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
