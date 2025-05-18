"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "~/server/auth";

const prisma = new PrismaClient();

// Добавление блюда в корзину
export const addToCart = async (dishId: string) => {
  const session = await auth();
  if (!session?.user?.id) return null;

// Проверка есть ли у пользователя в корзине уже такое блюдо
  const existingCartItem = await prisma.cart.findFirst({
    where: {
      userId: session.user.id,
      dishID: dishId,
    },
  });

  if (existingCartItem) {
// Если есть - увеличиваем количество
    await prisma.cart.update({
      where: { id: existingCartItem.id },
      data: { count: existingCartItem.count + 1 },
    });
  } else {
// Если нет - создаем новую запись
    await prisma.cart.create({
      data: {
        userId: session.user.id,
        dishID: dishId,
        count: 1,
      },
    });
  }
  return await getCartCount();
};

// Получение количества товаров в корзине
export const getCartCount = async () => {
  const session = await auth();
  if (!session?.user?.id) return 0;

  const cartItems = await prisma.cart.findMany({
    where: { userId: session.user.id },
  });
  return cartItems.reduce((sum: number, item) => sum + item.count, 0);
};

// Удаление товара из корзины
export const removeFromCart = async (dishId: string) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  await prisma.cart.deleteMany({
    where: {
      userId: session.user.id,
      dishID: dishId,
    },
  });
  return await getCartCount();
};