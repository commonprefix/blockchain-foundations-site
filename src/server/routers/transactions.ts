import { Address, Id } from 'common/id';
import { Transaction } from 'common/transaction';
import {
  createTransaction,
  getTransactionByAddress,
  getTransactionById
} from 'server/controllers/transactions';
import {
  adminDatabaseProcedure,
  databaseProcedure
} from 'server/procedures/database';

import { router } from '../trpc';

export const transactionsRouter = router({
  create: adminDatabaseProcedure.input(Transaction).mutation(({ input }) => {
    return createTransaction(input);
  }),
  getById: databaseProcedure.input(Id).query(({ input }) => {
    return getTransactionById(input);
  }),
  getByAddress: databaseProcedure.input(Address).query(({ input }) => {
    return getTransactionByAddress(input);
  })
});
