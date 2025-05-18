import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dishRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.dish.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true,
      },
    });
  }),
}); 