import { Heading } from '@chakra-ui/react';
import { ExplorerContainer } from 'client/components/explorer/container';
import { TransactionComponent } from 'client/components/explorer/transaction';
import { ExplorerLayout } from 'client/components/layout';
import { useRouter } from 'next/router';

export default function TransactionPage() {
  const router = useRouter();

  return (
    <ExplorerLayout>
      <ExplorerContainer>
        <Heading>Transaction</Heading>
        {router.query.id !== undefined && (
          <TransactionComponent id={String(router.query.id)} />
        )}
      </ExplorerContainer>
    </ExplorerLayout>
  );
}
