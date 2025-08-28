import {
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import Layout from 'client/components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle
} from 'client/components/section';
import TitleSection from 'client/components/titleSection';
import { euDate, euTime } from 'common/date';

type PSETProps = React.PropsWithChildren<{
  softDeadline?: Date;
  hardDeadline: Date;
  link?: string;
  solutionLink?: string;
}>;

function PSET({
  softDeadline,
  hardDeadline,
  link,
  solutionLink,
  children
}: PSETProps) {
  const primaryColor = 'blue.400';

  return (
    <Tr>
      <Td textAlign="center">
        <Stack spacing={2}>
          {link ? (
            <Link color={primaryColor} href={link} target="_blank">
              {children}
            </Link>
          ) : (
            <Text>{children}</Text>
          )}
          {solutionLink ? (
            <Link color={primaryColor} href={solutionLink} target="_blank">
              {children} Solution
            </Link>
          ) : null}
        </Stack>
      </Td>
      <Td textAlign="center">
        {softDeadline && `${euDate(softDeadline)} (${euTime(softDeadline)})`}
      </Td>
      <Td textAlign="center">
        <Text>
        {hardDeadline && `${euDate(hardDeadline)} (${euTime(hardDeadline)})`}
        </Text>
      </Td>
    </Tr>
  );
}

export default function PSETsPage() {
  return (
    <Layout title="PSETs" description="Problem Sets">
      <Sections>
        <TitleSection title="Problem Sets" />
        <Section id="psets">
          <Subsection>
            <SubsectionTitle>Problem Sets and Theory Exercises</SubsectionTitle>
            <Table>

              <Thead>
                <Tr>
                  <Th textAlign="center">PSET / Exercise</Th>

                  <Th textAlign="center">Soft Deadline</Th>

                  <Th textAlign="center">Hard Deadline</Th>
                </Tr>
              </Thead>

              <Tbody>

                <PSET
                  softDeadline={new Date(2026, 1, 25, 14, 0)}
                  hardDeadline={new Date(2026, 1, 27, 14, 0)}
                  link="/psets/pset1.pdf"
                  solutionLink=""
                >
                  Problem Set 1
                </PSET>

                <PSET
                  softDeadline={new Date(2026, 2, 18, 14, 0)}
                  hardDeadline={new Date(2026, 2, 20, 14, 0)}
                  link="/psets/pset2.pdf"
                  solutionLink=""
                >
                  Problem Set 2
                </PSET>

                <PSET
                  softDeadline={new Date(2026, 2, 25, 14, 0)}
                  hardDeadline={new Date(2026, 2, 27, 14, 0)}
                  link="/psets/pset3.pdf"
                  solutionLink=""
                >
                  Problem Set 3
                </PSET>

                <PSET
                  hardDeadline={new Date(2026, 3, 3, 14, 0)}
                  link=""
                  solutionLink=""
                >
                  Theory Exercise 1
                </PSET>

                <PSET
                  hardDeadline={new Date(2026, 3, 10, 14, 0)}
                  link=""
                  solutionLink=""
                >
                  Theory Exercise 2
                </PSET>

                <PSET
                  softDeadline={new Date(2026, 3, 29, 14, 0)}
                  hardDeadline={new Date(2026, 4, 1, 14, 0)}
                  link="/psets/pset4.pdf"
                  solutionLink=""
                >
                  Problem Set 4
                </PSET>

                <PSET
                  softDeadline={new Date(2026, 4, 6, 14, 0)}
                  hardDeadline={new Date(2026, 4, 8, 14, 0)}
                  link="/psets/pset5.pdf"
                  solutionLink=""
                >
                  Problem Set 5
                </PSET>

                <PSET
                  softDeadline={new Date(2026, 4, 13, 14, 0)}
                  hardDeadline={new Date(2026, 4, 20, 14, 0)}
                  link="/psets/pset6.pdf"
                  solutionLink=""
                >
                  Problem Set 6
                </PSET>

                <PSET
                  hardDeadline={new Date(2026, 4, 22, 14, 0)}
                  link=""
                  solutionLink=""
                >
                  Theory Exercise 3
                </PSET>

                <PSET
                  hardDeadline={new Date(2026, 5, 19, 14, 0)}
                  link=""
                  solutionLink=""
                >
                  Theory Exercise 4
                </PSET>

              </Tbody>
            </Table>
          </Subsection>
        </Section>
      </Sections>
    </Layout>
  );
}
