import { Input } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const configurationRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ templateId: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.configuration.findMany({
        where: {
          userId: ctx.session.user.id,
          ...(input.templateId ? { templateId: input.templateId } : {}),
        },
      });
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.configuration.findFirstOrThrow({
        where: {
          userId: ctx.session.user.id,
          id: input.id,
        },
      });
    }),
  add: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        name: z.string(),
        valid: z.boolean().optional(),
        content: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const parsedContent: Prisma.JsonValue | undefined = JSON.parse(
        input.content || ""
      ) as string;

      return ctx.prisma.configuration.create({
        data: {
          ...input,
          content: parsedContent,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.configuration.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
