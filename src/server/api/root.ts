import { createTRPCRouter } from "./trpc";
import { templateRouter } from "./routers/template";
import { configurationRouter } from "./routers/configuration";
import { meRouter } from "./routers/me";
import { validatorRouter } from "./routers/validator";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  template: templateRouter,
  configuration: configurationRouter,
  me: meRouter,
  validator: validatorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
