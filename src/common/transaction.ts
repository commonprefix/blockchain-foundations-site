import { z } from 'zod';

import { Address, Id, Signature } from './id';

const TransactionOutpoint = z.object({
  txid: Id,
  index: z.number().nonnegative()
});
export type TransactionOutpoint = z.infer<typeof TransactionOutpoint>;

const TransactionInput = z.object({
  outpoint: TransactionOutpoint,
  sig: Signature
});
export type TransactionInput = z.infer<typeof TransactionInput>;

const TransactionOutput = z.object({
  pubkey: Address,
  value: z.number().nonnegative()
});
export type TransactionOutput = z.infer<typeof TransactionOutput>;

const CoinbaseTransaction = z.object({
  id: Id,
  type: z.literal('transaction'),
  height: z.number().nonnegative(),
  outputs: z.array(TransactionOutput)
});
export type CoinbaseTransaction = z.infer<typeof CoinbaseTransaction>;

const RegularTransaction = z.object({
  id: Id,
  type: z.literal('transaction'),
  inputs: z.array(TransactionInput),
  outputs: z.array(TransactionOutput)
});
export type RegularTransaction = z.infer<typeof RegularTransaction>;

export const Transaction = z.union([CoinbaseTransaction, RegularTransaction]);
export type Transaction = z.infer<typeof Transaction>;
