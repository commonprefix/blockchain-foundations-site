import { Link } from '@chakra-ui/react';
import { ExplorerLayout } from 'client/components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle
} from 'client/components/section';
import TitleSection from 'client/components/titleSection';

export default function ExplorerPage() {
  const primaryColor = 'blue.400';

  return (
    <ExplorerLayout>
      <Sections>
        <TitleSection title="Blockchain Explorer" />
        <Section id="explorer">
          <Subsection>
            <SubsectionTitle>Quick Links</SubsectionTitle>
            <Link color={primaryColor} href="/explorer/tree">
              Full block tree visualizer
            </Link>
            <Link color={primaryColor} href="/explorer/chain">
              Longest chain block list
            </Link>
          </Subsection>
        </Section>
      </Sections>
    </ExplorerLayout>
  );
}
