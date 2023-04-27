import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { isValidJson, validate } from "../../../utils/validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import omit from "lodash-es/omit";

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
          Template: true,
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
      let parsedContent: Prisma.JsonValue = {};

      if (input.content && isValidJson(input.content)) {
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
          content: parsedContent as object,
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
  clone: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Find the existing configuration by id and userId, including the related ConfigurationError records
      const existingConfig = await ctx.prisma.configuration.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          errors: true,
        },
      });

      // Clone the configuration with the new name and store it
      return await ctx.prisma.configuration.create({
        data: {
          ...omit(existingConfig, ["id", "errors", "createdAt", "updatedAt"]),
          name: input.name,
          userId: ctx.session.user.id,
          content: existingConfig.content as Prisma.InputJsonValue,
          errors: {
            create: existingConfig.errors.map((error) => ({
              path: error.path,
              message: error.message,
            })),
          },
        },
      });
    }),
  download: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Find the configuration by id and userId
      const config = await ctx.prisma.configuration.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      // Check if the content is valid JSON, not necessary but just to be sure
      if (typeof config.content === "object" && config.content !== null) {
        // Generate a JSON string from the content object
        const jsonString = JSON.stringify(config.content, null, 2);

        // Create a Buffer from the JSON string
        const buffer = Buffer.from(jsonString, "utf-8");

        // Convert the buffer to a base64 string
        const base64 = buffer.toString("base64");

        // Return the Blob and configuration name as a downloadable JSON file
        return {
          base64,
          fileName: `${config.name}.json`,
        };
      } else {
        throw new Error("Invalid configuration content!");
      }
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
      let parsedContent: object = {};

      if (input.content && isValidJson(input.content)) {
        parsedContent = JSON.parse(input.content) as object;
      }

      const configuration = await ctx.prisma.configuration.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          Template: true,
        },
      });

      const validator = validate({
        schema: JSON.stringify(configuration.Template?.content) || "",
        configuration: input.content || "",
      });

      // If the configuration is not valid, create configuration errors
      // Delete all current errors for this configurations
      await ctx.prisma.configurationError.deleteMany({});
      // Create new errors
      await ctx.prisma.configurationError.createMany({
        data: validator.errors.map((error) => ({
          configurationId: input.id,
          path: error.path,
          message: error.message || "",
        })),
      });

      return ctx.prisma.configuration.updateMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          ...omit(input, "id", "content"),
          content: parsedContent,
          valid: validator.valid,
        },
      });
    }),
});
