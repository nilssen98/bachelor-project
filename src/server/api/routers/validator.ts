import { z } from "zod";
import { validate } from "../../../utils/validator";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const validatorRouter = createTRPCRouter({
  validate: publicProcedure
    .meta({ openapi: { method: "POST", path: "/validate" } })
    .input(
      z.object({
        configuration: z.string(),
        schema: z.string(),
      })
    )
    .output(
      z.object({
        valid: z.boolean(),
        errors: z.array(
          z.object({
            path: z.string(),
            message: z.string(),
          })
        ),
      })
    )
    .query(({ input }) => {
      return validate({
        schema: input.schema,
        configuration: input.configuration,
      });
    }),
});
