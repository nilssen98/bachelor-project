import { Input } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { validate } from "../../../utils/validator";
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
        include: {
          errors: true,
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
    .mutation(async ({ ctx, input }) => {
      let parsedContent: Prisma.JsonValue | undefined = undefined;

      // Parse the content to JSON format if exists
      if (input.content) {
        parsedContent = JSON.parse(input.content) as Prisma.JsonValue;
      }

      // Get the template schema
      const schema = await ctx.prisma.template.findFirst({
        where: {
          id: input.templateId,
        },
      });

      // Validate the configuration
      const validator = validate({
        schema: JSON.stringify(schema?.content || ""),
        configuration: input.content || "",
      });

      // Create the configuration and store it
      const configuration = await ctx.prisma.configuration.create({
        data: {
          ...input,
          ...(parsedContent ? { content: parsedContent } : {}),
          userId: ctx.session.user.id,
          valid: validator.valid,
        },
      });

      // If the configuration is not valid, create configuration errors
      if (!validator.valid && configuration && configuration.id) {
        await Promise.all(
          validator.errors.map(async (error) => {
            await ctx.prisma.configurationError.create({
              data: {
                configurationId: configuration.id,
                path: error.path,
                message: error.message || "",
              },
            });
          })
        );
      }

      return configuration;
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
