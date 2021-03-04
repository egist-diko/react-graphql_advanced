const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

//Cocktail Type
const CocktailType = new GraphQLObjectType({
  name: "Cocktail",
  fields: () => ({
    drinks: { type: GraphQLList(DrinksType) },
  }),
});

const DrinksType = new GraphQLObjectType({
  name: "Drinks",
  fields: () => ({
    idDrink: { type: GraphQLString },
    strDrink: { type: GraphQLString },
    strDrinkThumb: { type: GraphQLString },
    strAlcoholic: { type: GraphQLString },
    strGlass: { type: GraphQLString },
    strCategory: { type: GraphQLString },
    strInstructions: { type: GraphQLString },
    strIngredient1: { type: GraphQLString },
    strIngredient2: { type: GraphQLString },
    strIngredient3: { type: GraphQLString },
    strIngredient4: { type: GraphQLString },
    strIngredient5: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    cocktails: {
      type: CocktailType,
      args: {
        strDrink: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${args.strDrink}`
          )
          .then((res) => res.data);
      },
    },
    cocktail: {
      type: CocktailType,
      args: {
        idDrink: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${args.idDrink}`
          )
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
