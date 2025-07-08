import { Heading } from '@chakra-ui/react';
import { AddressComponent } from 'client/components/explorer/address';
import { ExplorerContainer } from 'client/components/explorer/container';
import { ExplorerLayout } from 'client/components/layout';
import { useRouter } from 'next/router';

export default function AddressPage() {
  const router = useRouter();

  return (
    <ExplorerLayout>
      <ExplorerContainer>
        <Heading>Address</Heading>
        {router.query.id !== undefined && (
          <AddressComponent id={String(router.query.id)} />
        )}
      </ExplorerContainer>
    </ExplorerLayout>
  );
}
