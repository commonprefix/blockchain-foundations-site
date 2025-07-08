import { Account } from 'common/account';
import { HydratedDocument, Model, model, models, Schema } from 'mongoose';

import { defaultSchemaOptions } from './common';

export type AccountModelType = Account;

const schema = new Schema<AccountModelType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    balance: { type: Number, required: true, min: 0 },
    transactionIds: { type: [String], required: true }
  },
  defaultSchemaOptions
);

// eslint-disable-next-line @typescript-eslint/ban-types
export const AccountModel: Model<AccountModelType, {}, {}> =
  models.Account ?? model<AccountModelType>('Account', schema);

export function accountToDoc(account: Account): AccountModelType {
  return account;
}

export function docToAccount(
  account: HydratedDocument<AccountModelType>
): Account {
  return account.toObject();
}
