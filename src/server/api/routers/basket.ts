import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const basketRouter = createTRPCRouter({
  getCartItems: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const cartItems = await ctx.db.cart.findMany({
      where: { userId },
      include: {
        dish: true, 
      },
    });

    return cartItems.map(item => ({
      id: item.id,
      name: item.dish.name,
      price: item.dish.price,
      image: item.dish.image,
      quantity: item.count,
    }));
  }),

  addToCart: protectedProcedure
    .input(z.object({ dishId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { dishId } = input;
      const userId = ctx.session.user.id;

      console.log("Поиск блюда с ID:", dishId); 

      // Проверяем существование блюда
      const dish = await ctx.db.dish.findUnique({
        where: { id: dishId },
      });

      console.log("Найденное блюдо:", dish); 

      if (!dish) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Блюдо не найдено",
        });
      }

      // Проверяем, есть ли уже такое блюдо в корзине пользователя
      const existingCartItem = await ctx.db.cart.findFirst({
        where: {
          userId,
          dishID: dishId,
        },
      });

      if (existingCartItem) {
        // Если есть - увеличиваем количество
        await ctx.db.cart.update({
          where: { id: existingCartItem.id },
          data: { count: existingCartItem.count + 1 },
        });
      } else {
        // Если нет - создаем новую запись
        await ctx.db.cart.create({
          data: {
            userId,
            dishID: dishId,
            count: 1,
          },
        });
      }

      // Возвращаем обновленное количество товаров в корзине
      const cartItems = await ctx.db.cart.findMany({
        where: { userId },
      });

      return cartItems.reduce((sum, item) => sum + item.count, 0);
    }),

  getCount: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const cartItems = await ctx.db.cart.findMany({
      where: { userId },
    });

    return cartItems.reduce((sum, item) => sum + item.count, 0);
  }),

  removeFromCart: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { itemId } = input;
      const userId = ctx.session.user.id;

      await ctx.db.cart.deleteMany({
        where: {
          userId,
          id: itemId,
        },
      });

      // Возвращаем обновленное количество товаров в корзине
      const cartItems = await ctx.db.cart.findMany({
        where: { userId },
      });

      return cartItems.reduce((sum, item) => sum + item.count, 0);
    }),

  updateCartItemCount: protectedProcedure
    .input(z.object({ itemId: z.string(), delta: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { itemId, delta } = input;
      const userId = ctx.session.user.id;

      // Проверяем существование записи
      const cartItem = await ctx.db.cart.findFirst({
        where: { id: itemId, userId },
      });
      if (!cartItem) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Товар не найден в корзине" });
      }

      const newCount = cartItem.count + delta;
      if (newCount <= 0) {
        // Если количество стало 0 или меньше — запись удаляется
        await ctx.db.cart.delete({ where: { id: itemId } });
        return 0;
      } else {
        // Иначе обновляем количество
        await ctx.db.cart.update({ where: { id: itemId }, data: { count: newCount } });
        return newCount;
      }
    }),

  buy: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Получаем все товары из корзины пользователя
    const cartItems = await ctx.db.cart.findMany({
      where: { userId },
      include: { dish: true },
    });

    if (cartItems.length === 0) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Корзина пуста" });
    }

    // Создаём заказ
    const order = await ctx.db.order.create({
      data: { userId },
    });

    // Добавляем позиции в заказ
    await Promise.all(
      cartItems.map(item =>
        ctx.db.orderPosition.create({
          data: {
            orderID: order.id,
            dishID: item.dishID,
            count: item.count,
          },
        })
      )
    );

    // Очищаем корзину
    await ctx.db.cart.deleteMany({ where: { userId } });

    return { success: true, orderId: order.id };
  }),
});