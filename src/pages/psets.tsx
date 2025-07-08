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
import { usDate, usTime } from 'common/date';

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
        {softDeadline && (
          <Text>
            {usDate(softDeadline)} ({usTime(softDeadline)})
          </Text>
        )}
      </Td>
      <Td textAlign="center">
        <Text>
          TBD
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
                  hardDeadline={new Date(2023, 0, 19, 13, 30)}
                  link="/psets/pset1.pdf"
                  solutionLink="#"
                >
                  Problem Set 1
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 0, 26, 13, 15)}
                  link="/psets/pset2.pdf"
                  solutionLink="#"
                >
                  Problem Set 2
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 1, 2, 13, 15)}
                  link="/psets/pset3.pdf"
                  solutionLink="#"
                >
                  Problem Set 3
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 1, 6, 13, 15)}
                  link="/psets/theory_exercise_1.pdf"
                  solutionLink="/psets/theory_exercise_1_solutions.pdf"
                >
                  Theory Exercise 1
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 1, 13, 13, 15)}
                  link="/psets/theory_exercise_2.pdf"
                  solutionLink="/psets/theory_exercise_2_solutions.pdf"
                >
                  Theory Exercise 2
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 1, 23, 13, 15)}
                  link="/psets/pset4.pdf"
                  solutionLink="#"
                >
                  Problem Set 4
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 2, 2, 13, 15)}
                  link="/psets/pset5.pdf"
                  solutionLink="#"
                >
                  Problem Set 5
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 2, 13, 13, 15)}
                  link="/psets/pset6.pdf"
                  solutionLink="#"
                >
                  Problem Set 6
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 2, 16, 13, 15)}
                  link="/psets/theory_exercise_3.pdf"
                  solutionLink="/psets/theory_exercise_3_solutions.pdf"
                >
                  Theory Exercise 3
                </PSET>

                <PSET
                  hardDeadline={new Date(2023, 2, 20, 13, 15)}
                  link="/psets/theory_exercise_4.pdf"
                  solutionLink="/psets/theory_exercise_4_solutions.pdf"
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
