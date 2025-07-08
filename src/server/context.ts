import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

const ADMIN_SECRET_TOKEN = process.env.ADMIN_SECRET_TOKEN;
if (!ADMIN_SECRET_TOKEN) {
  throw new Error('Missing ADMIN_SECRET_TOKEN');
}

export async function createContext({
  req
}: trpcNext.CreateNextContextOptions) {
  return {
    isAdmin: req.headers.authorization === ADMIN_SECRET_TOKEN
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
