import { TRPCClientError } from '@trpc/client';
import { Account } from 'common/account';
import { Address } from 'common/id';
import { Transaction } from 'common/transaction';
import {
  AccountModel,
  accountToDoc,
  docToAccount
} from 'server/models/account';

export async function addToAccount(
  transaction: Transaction
): Promise<Account[]> {
  return await Promise.all(
    transaction.outputs.map(async ({ value, pubkey: address }) => {
      let doc = await AccountModel.findOne({ id: address });
      if (doc) {
        doc.transactionIds.push(transaction.id);
        doc.balance += value;
        await doc.save();
      } else {
        doc = await AccountModel.create(
          accountToDoc({
            id: address,
            balance: value,
            transactionIds: [transaction.id]
          })
        );
      }
      return docToAccount(doc);
    })
  );
}

export async function removeFromAccount(
  transaction: Transaction
): Promise<Account[]> {
  return (
    await Promise.all(
      transaction.outputs.map(async ({ value, pubkey: address }) => {
        const doc = await AccountModel.findOne({ id: address });
        if (!doc) {
          throw new TRPCClientError('Account does not exist');
        }
        doc.transactionIds = doc.transactionIds.filter(
          (id) => id !== transaction.id
        );
        doc.balance -= value;
        if (doc.balance <= 0) {
          await doc.remove();
          return [];
        } else {
          await doc.save();
          return [docToAccount(doc)];
        }
      })
    )
  ).flat();
}

export async function getAccountById(id: Address): Promise<Account | null> {
  const doc = await AccountModel.findOne({ id });
  return doc ? docToAccount(doc) : null;
}
