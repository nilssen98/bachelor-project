import { createTRPCRouter, protectedProcedure } from "../trpc";

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
});
