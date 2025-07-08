import { router } from 'server/trpc';

import { accountsRouter } from './accounts';
import { blocksRouter } from './blocks';
import { transactionsRouter } from './transactions';

export const appRouter = router({
  accounts: accountsRouter,
  blocks: blocksRouter,
  transactions: transactionsRouter
});

export type AppRouter = typeof appRouter;
