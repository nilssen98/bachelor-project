import { z } from "zod";
import { validate } from "../../../utils/validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const validatorRouter = createTRPCRouter({
  validate: protectedProcedure
    .input(
      z.object({
        configuration: z.string(),
        schema: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return validate({
        schema: input.schema,
        configuration: input.configuration,
      });
    }),
});
