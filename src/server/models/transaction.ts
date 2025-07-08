import { Transaction } from 'common/transaction';
import { HydratedDocument, Model, model, models, Schema } from 'mongoose';

import { defaultSchemaOptions } from './common';

export type TransactionModelType = Transaction;

const schema = new Schema<TransactionModelType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, enum: ['transaction'] },
    height: { type: Number, required: false },
    inputs: {
      _id: false,
      type: [
        {
          _id: false,
          type: {
            outpoint: {
              _id: false,
              type: {
                txid: { type: String, required: true },
                index: { type: Number, required: true }
              },
              required: true
            },
            sig: { type: String, required: true }
          },
          required: true
        }
      ],
      required: false
    },
    outputs: {
      _id: false,
      type: [
        {
          _id: false,
          type: {
            value: { type: Number, required: true },
            pubkey: { type: String, required: true }
          },
          required: true
        }
      ],
      required: true
    }
  },
  defaultSchemaOptions
);

// eslint-disable-next-line @typescript-eslint/ban-types
export const TransactionModel: Model<TransactionModelType, {}, {}> =
  models.Transaction ?? model<TransactionModelType>('Transaction', schema);

export function transactionToDoc(
  transaction: Transaction
): TransactionModelType {
  return transaction;
}

export function docToTransaction(
  transaction: HydratedDocument<TransactionModelType>
): Transaction {
  return transaction.toObject();
}
