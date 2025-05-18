/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ingredients = [
  { name: "Салями" },
  { name: "Руккола" },
  { name: "Помидоры" },
  { name: "Оливки" },
  { name: "Острый перец" },
  { name: "Лепёшка" },
  { name: "Фарш" },
  { name: "Свинина" },
  { name: "Картофель-беби" },
  { name: "Малиновый соус" },
  { name: "Вяленые томаты" },
  { name: "Моцарелла" },
  { name: "Дикие брокколи" },
  { name: "Сыр пармезан" },
];

const dishes = [
  {
    name: "Наслаждение",
    price: 300,
    description: "Салями, руккола, помидоры, оливки",
    image: "pizza.png",
    ingredients: ['Салями', 'Руккола', 'Помидоры', 'Оливки'],
  },
  {
    name: "Такос",
    price: 250,
    description: "Острый перец, лепёшка, фарш",
    image: "tacos.png",
    ingredients: ['Острый перец', 'Лепёшка', 'Фарш'],
  },
  {
    name: "Портерхаус-стейк",
    price: 450,
    description: "Свинина, картофель-беби, малиновый соус",
    image: "meat.png",
    ingredients: ['Свинина', 'Картофель-беби', 'Малиновый соус'],
  },
  {
    name: "Римская пицца",
    price: 500,
    description: "Вяленые томаты, моцарелла, дикие брокколи, сыр пармезан",
    image: "pizza1.png",
    ingredients: ['Вяленые томаты', 'Моцарелла', 'Дикие брокколи', 'Сыр пармезан'],
  },
];

const users = [
  {
    email: "client1@example.com",
    firstname: "Иван",
    surname: "Иванов",
  },
  {
    email: "client2@example.com",
    firstname: "Сергей",
    surname: "Сергеев",
  },
];

async function main() {
  // Создаем ингредиенты
  await Promise.all(
    ingredients.map(async (ingredient) => {
      await prisma.ingredient.upsert({
        where: { name: ingredient.name },
        update: {},
        create: {
          name: ingredient.name,
        },
      });
    })
  );

  // Создаем блюда и их составы
  await Promise.all(
    dishes.map(async (dish) => {
      const { ingredients: dishIngredients, ...dishData } = dish;
      const createdDish = await prisma.dish.create({
        data: dishData,
      });

      // Добавляем ингредиенты для блюда
      await Promise.all(
        dishIngredients.map(async (ingredientName) => {
          const ingredient = await prisma.ingredient.findUnique({
            where: { name: ingredientName },
          });
          if (ingredient) {
            await prisma.composition.upsert({
              where: {
                composition_unique: {
                  dishID: createdDish.id,
                  ingredientID: ingredient.id,
                },
              },
              update: {},
              create: {
                dishID: createdDish.id,
                ingredientID: ingredient.id,
              },
            });
          }
        })
      );
    })
  );

  // Создаем пользователей
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          name: `${user.firstname} ${user.surname}`,
          emailVerified: null,
          image: null,
        },
      });
    })
  );

  // Создаем корзины для пользователей
  const allUsers = await prisma.user.findMany();
  const allDishes = await prisma.dish.findMany();

  await Promise.all(
    allUsers.map(async (user, index) => {
      const dish = allDishes[index % allDishes.length]; // Распределяем блюда по пользователям

      if (!dish) {
        throw new Error("Not enough dishes");
      }

      await prisma.cart.upsert({
        where: {
          user_dish_unique: {
            userId: user.id,
            dishID: dish.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          dishID: dish.id,
          count: 1 + (index % 2),
        },
      });
    })
  );

  // Создаем заказы
  await Promise.all(
    allUsers.map(async (user) => {
      const order = await prisma.order.create({
        data: {
          userId: user.id,
        },
      });

      // Добавляем позиции в заказ
      await prisma.orderPosition.create({
        data: {
          orderID: order.id,
          dishID: allDishes[0]!.id, // Первое блюдо в заказе
          count: 2,
        },
      });
    })
  );

  console.log("Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });