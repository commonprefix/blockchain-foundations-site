import { TRPCError } from '@trpc/server';
import { connectToDatabase } from 'server/database';
import { middleware, publicProcedure } from 'server/trpc';

const databaseMiddleware = middleware(async ({ ctx, next }) => {
  await connectToDatabase();
  return next({ ctx });
});

const adminMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx });
});

export const databaseProcedure = publicProcedure.use(databaseMiddleware);
export const adminDatabaseProcedure = publicProcedure
  .use(adminMiddleware)
  .use(databaseMiddleware);
