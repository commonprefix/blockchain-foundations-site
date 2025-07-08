import { ExplorerLayout } from 'client/components/layout';
import { trpc } from 'client/trpc';
import dynamic from 'next/dynamic';

const TreeComponent = dynamic(() => import('client/components/explorer/tree'), {
  ssr: false
});

export default function TreePage() {
  const { data: tip } = trpc.blocks.getChainTip.useQuery();

  return (
    <ExplorerLayout>
      {tip ? <TreeComponent tipHeight={tip.height} /> : null}
    </ExplorerLayout>
  );
}
