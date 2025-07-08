import { Address } from 'common/id';
import { getAccountById } from 'server/controllers/accounts';
import { databaseProcedure } from 'server/procedures/database';

import { router } from '../trpc';

export const accountsRouter = router({
  getById: databaseProcedure.input(Address).query(({ input }) => {
    return getAccountById(input);
  })
});
