import type { Prisma } from "@prisma/client";
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
        content: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const parsedContent: Prisma.JsonValue | undefined = JSON.parse(
        input.content || ""
      ) as string;

      return ctx.prisma.template.create({
        data: {
          ...input,
          content: parsedContent,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.template.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
