"use client";

import FoodCard from "./FoodCard";
import { api } from "~/trpc/react";

const Menu = () => {
  const { data: dishes = [], isLoading } = api.dish.getAll.useQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  console.dir(dishes, { depth: 5 });
  return (
    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {dishes.map((dish) => (
        <FoodCard 
          key={dish.id}
          id={dish.id}
          title={dish.name}
          description={dish.description}
          price={dish.price}
          rating={4.5}
          imageUrl={dish.image}
        />
      ))}
    </div>
  );
};

export default Menu;
