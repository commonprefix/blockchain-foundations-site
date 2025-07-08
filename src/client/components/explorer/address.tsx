import { Stack } from '@chakra-ui/react';
import { trpc } from 'client/trpc';

import { TransactionLink } from './objectLink';

export interface AddressComponentProps {
  id: string;
}

export function AddressComponent({ id }: AddressComponentProps) {
  const { data: account } = trpc.accounts.getById.useQuery(id);

  if (!account) return null;

  return (
    <Stack>
      <h5 className="title is-5">Address {id}</h5>

      {/* TODO: only keep longest chain amounts */}
      {/* <div>
        <strong>Total amount received</strong>:{' '}
        <Amount amount={account.balance} />
      </div> */}

      <div>
        <strong>{account.transactionIds.length} transaction outputs</strong>:{' '}
        <ol>
          {account.transactionIds.map((transactionId) => (
            <li key={transactionId}>
              <TransactionLink id={transactionId} />
            </li>
          ))}
        </ol>
      </div>
    </Stack>
  );
}
