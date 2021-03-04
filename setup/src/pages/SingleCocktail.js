import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const COCKTAIL_QUERY = gql`
  query CocktailQuery($idDrink: String) {
    cocktail(idDrink: $idDrink) {
      drinks {
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

export default function SingleCocktail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(COCKTAIL_QUERY, {
    variables: { idDrink: id },
  });
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    if (!loading) {
      const ingredients = [
        data.cocktail.drinks[0].strIngredient1,
        data.cocktail.drinks[0].strIngredient2,
        data.cocktail.drinks[0].strIngredient3,
        data.cocktail.drinks[0].strIngredient4,
        data.cocktail.drinks[0].strIngredient5,
      ];
      const name = data.cocktail.drinks[0].strDrink;
      const image = data.cocktail.drinks[0].strDrinkThumb;
      const info = data.cocktail.drinks[0].strAlcoholic;
      const category = data.cocktail.drinks[0].strCategory;
      const glass = data.cocktail.drinks[0].strGlass;
      const instructions = data.cocktail.drinks[0].strInstructions;
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      setCocktail(newCocktail);
    }
  }, [id, loading]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>shit</div>;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name}></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {name}
            </p>
            <p>
              <span className="drink-data">category :</span> {category}
            </p>
            <p>
              <span className="drink-data">info :</span> {info}
            </p>
            <p>
              <span className="drink-data">glass :</span> {glass}
            </p>
            <p>
              <span className="drink-data">instructons :</span> {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
