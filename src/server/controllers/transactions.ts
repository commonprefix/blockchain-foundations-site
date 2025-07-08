import { Address, Id } from 'common/id';
import { Transaction } from 'common/transaction';
import {
  docToTransaction,
  TransactionModel,
  transactionToDoc
} from 'server/models/transaction';

import { addToAccount } from './accounts';

export async function createTransaction(
  transaction: Transaction
): Promise<Transaction> {
  const doc = await TransactionModel.create(transactionToDoc(transaction));
  await addToAccount(transaction); // TODO: Only do this if the transaction is in a block on the longest chain, and make sure to remove if no longer on the longest chain
  return docToTransaction(doc);
}

export async function getTransactionById(id: Id): Promise<Transaction | null> {
  const doc = await TransactionModel.findOne({ id });
  return doc ? docToTransaction(doc) : null;
}

// Not in use
export async function getTransactionByAddress(address: Address): Promise<Id[]> {
  const docs = await TransactionModel.find({
    outputs: { $elemMatch: { pubkey: address } }
  });
  return docs.map((doc) => docToTransaction(doc).id);
}
