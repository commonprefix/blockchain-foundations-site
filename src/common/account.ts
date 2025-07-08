import { z } from 'zod';

import { Address, Id } from './id';

const Account = z.object({
  id: Address,
  balance: z.number().nonnegative(),
  transactionIds: z.array(Id)
});
export type Account = z.infer<typeof Account>;
