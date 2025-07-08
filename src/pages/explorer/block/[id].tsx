import { Heading } from '@chakra-ui/react';
import { BlockComponent } from 'client/components/explorer/block';
import { ExplorerContainer } from 'client/components/explorer/container';
import { ExplorerLayout } from 'client/components/layout';
import { useRouter } from 'next/router';

export default function BlockPage() {
  const router = useRouter();

  return (
    <ExplorerLayout>
      <ExplorerContainer>
        <Heading>Block</Heading>
        {router.query.id !== undefined && (
          <BlockComponent id={String(router.query.id)} />
        )}
      </ExplorerContainer>
    </ExplorerLayout>
  );
}
