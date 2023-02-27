import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const meRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        accounts: true,
      },
    });
  }),
  unlink: protectedProcedure
    .input(z.object({ provider: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.account.deleteMany({
        where: {
          userId: ctx.session.user.id,
          provider: input.provider,
        },
      });
    }),
});
