import { z } from 'zod';

import { Id, Nonce } from './id';

export const TARGET =
  '00000000abc00000000000000000000000000000000000000000000000000000';

export const GENESIS_BLOCK_ID =
  '0000000052a0e645eca917ae1c196e0d0a4fb756747f29ef52594d68484bb5e2';

const CappedString = z.string().max(128);

export const Block = z.object({
  id: Id,
  height: z.number().nonnegative(),
  type: z.literal('block'),
  created: z.number().nonnegative(),
  T: z.literal(TARGET),
  nonce: Nonce,
  previd: z.union([Id, z.null()]),
  miner: z.optional(CappedString),
  note: z.optional(CappedString),
  studentids: z.optional(z.array(CappedString).max(10)),
  txids: z.array(Id)
});
export type Block = z.infer<typeof Block>;
