import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const templateRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.template.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.template.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.template.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
});
