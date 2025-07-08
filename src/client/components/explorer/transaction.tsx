import { Heading, Stack, Text } from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import { TransactionInput, TransactionOutput } from 'common/transaction';

import { Amount } from './amount';
import { AddressLink, TransactionLink } from './objectLink';

interface TransactionInputComponentProps {
  input: TransactionInput;
}

function TransactionInputComponent({ input }: TransactionInputComponentProps) {
  const { data: transaction } = trpc.transactions.getById.useQuery(
    input.outpoint.txid
  );

  const address = transaction?.outputs[input.outpoint.index].pubkey;

  return (
    <Text>
      Outpoint (
      <TransactionLink id={input.outpoint.txid} />,{` `}
      {input.outpoint.index})
      {address ? (
        <>
          {' '}
          owned by <AddressLink id={address} />
        </>
      ) : null}
    </Text>
  );
}

interface TransactionOutputComponentProps {
  output: TransactionOutput;
}

function TransactionOutputComponent({
  output
}: TransactionOutputComponentProps) {
  return (
    <Text>
      Output paying <AddressLink id={output.pubkey} /> the amount of{' '}
      <Amount amount={output.value} />
    </Text>
  );
}

export interface TransactionComponentProps {
  id: string;
}

export function TransactionComponent({ id }: TransactionComponentProps) {
  const { data: transaction } = trpc.transactions.getById.useQuery(id);

  if (!transaction) return null;

  if ('height' in transaction) {
    transaction;
  }

  return (
    <Stack>
      <Text>{transaction.id}</Text>
      {'height' in transaction ? (
        <>
          <Heading size="md">Coinbase transaction</Heading>
          <Text>Height: {transaction.height}</Text>
        </>
      ) : (
        <>
          <Heading size="md">
            {transaction.inputs.length} input
            {transaction.inputs.length === 1 ? '' : 's'}
          </Heading>
          {transaction.inputs.map((input, index) => (
            <TransactionInputComponent key={index} input={input} />
          ))}
        </>
      )}
      <Heading size="md">
        {transaction.outputs.length} output
        {transaction.outputs.length === 1 ? '' : 's'}
      </Heading>
      {transaction.outputs.map((output, index) => (
        <TransactionOutputComponent
          key={index}
          output={transaction.outputs[0]}
        />
      ))}
    </Stack>
  );
}
