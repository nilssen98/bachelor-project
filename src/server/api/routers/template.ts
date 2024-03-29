import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import omit from "lodash-es/omit";
import { validate } from "../../../utils/validator";

export const templateRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.template.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: { configurations: true },
        },
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
      let parsedContent: Prisma.JsonValue | undefined = undefined;

      if (input.content) {
        parsedContent = JSON.parse(input.content) as Prisma.JsonValue;
      }
      return ctx.prisma.template.create({
        data: {
          ...input,
          ...(parsedContent ? { content: parsedContent } : {}),
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let parsedContent: Prisma.JsonValue | undefined = undefined;

      if (input.content) {
        parsedContent = JSON.parse(input.content) as Prisma.JsonValue;
      }

      if (parsedContent) {
        const template = await ctx.prisma.template.findFirst({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          include: {
            configurations: true,
          },
        });

        if (template) {
          await Promise.all(
            template.configurations.map(async (configuration) => {
              const validator = validate({
                schema: input.content || "",
                configuration: JSON.stringify(configuration.content) || "",
              });

              await ctx.prisma.configuration.update({
                where: {
                  id: configuration.id,
                },
                data: {
                  valid: validator.valid,
                },
              });
            })
          );
        }
      }

      return ctx.prisma.template.updateMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          ...omit(input, "id", "content", "createdAt"),
          ...(parsedContent ? { content: parsedContent } : {}),
        },
      });
    }),
});
