import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  function fetchMeals() {
    fetch("https://react-http-4f55f-default-rtdb.firebaseio.com/meals.json")
      .then((res) => res.json())
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

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
