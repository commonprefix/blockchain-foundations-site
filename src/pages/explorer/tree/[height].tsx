import { ExplorerLayout } from 'client/components/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const TreeComponent = dynamic(() => import('client/components/explorer/tree'), {
  ssr: false
});

export default function TreeAtHeightPage() {
  const router = useRouter();

  const height = parseInt(String(router.query.height));

  return (
    <ExplorerLayout>
      {isNaN(height) ? null : <TreeComponent tipHeight={height} />}
    </ExplorerLayout>
  );
}
