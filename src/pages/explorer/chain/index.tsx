import { ChainComponent } from 'client/components/explorer/chain';
import { ExplorerLayout } from 'client/components/layout';
import { trpc } from 'client/trpc';

export default function LongestChainPage() {
  const { data: tip } = trpc.blocks.getChainTip.useQuery();

  return (
    <ExplorerLayout>
      {tip ? <ChainComponent chainTipBlockId={tip.id} /> : null}
    </ExplorerLayout>
  );
}
