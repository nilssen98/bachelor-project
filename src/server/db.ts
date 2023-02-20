import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

/**
 * Delete expired verification tokens.
 */
prisma.$use(async (params, next) => {
  if (params.model == "VerificationToken" && params.action == "create") {
    await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lte: new Date(),
        },
      },
    });
  }
  return next(params);
});

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
