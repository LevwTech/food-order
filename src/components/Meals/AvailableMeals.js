import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  function fetchMeals() {
    fetch("https://react-http-4f55f-default-rtdb.firebaseio.com/meals.json")
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong!");
        return res.json();
      })
      .then((data) => {
        const loadedMeals = [];
        for (const obj in data) {
          loadedMeals.push({
            id: obj,
            name: data[obj].name,
            description: data[obj].description,
            price: data[obj].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoaded(true);
      })
      .catch((e) => {
        setIsError(true);
      });
  }
  useEffect(fetchMeals, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  let content;
  if (isError) {
    content = <p style={{ textAlign: "center" }}> Something Went Wrong! 😥</p>;
  } else if (!isLoaded) {
    content = <p style={{ textAlign: "center" }}> Loading...</p>;
  } else {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        {/* {isLoaded ? (
          <ul>{mealsList}</ul>
        ) : (
          <p style={{ textAlign: "center" }}> Loading...</p>
        )} */}
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
