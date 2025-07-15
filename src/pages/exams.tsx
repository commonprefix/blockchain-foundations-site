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

type ExamProps = React.PropsWithChildren<{
  link?: string;
  solutionsLink?: string;
}>;

function Exam({ link, solutionsLink, children }: ExamProps) {
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
          {solutionsLink ? (
            <Link color={primaryColor} href={solutionsLink} target="_blank">
              {children} Solutions
            </Link>
          ) : null}
        </Stack>
      </Td>
    </Tr>
  );
}

export default function ExamsPage() {
  return (
    <Layout title="Exams" description="Exams">
      <Sections>
        <TitleSection title="Exams" />
        <Section id="exams">
          <Subsection>
            <SubsectionTitle>Practice (with solutions)</SubsectionTitle>

            <Table>
              <Thead>
                <Tr>
                  <Th textAlign="center">Theory</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Exam
                  link="/practice/theory/practice_theory_1.pdf"
                >
                  Practice Theory 1
                </Exam>
                <Exam
                  link="/practice/theory/practice_theory_2.pdf"
                >
                  Practice Theory 2
                </Exam>
                <Exam
                  link="/practice/theory/practice_theory_3.pdf"
                >
                  Practice Theory 3
                </Exam>
                <Exam
                  link="/practice/theory/practice_theory_4.pdf"
                >
                  Practice Theory 4
                </Exam>
              </Tbody>
            </Table>

            <Table>
              <Thead>
                <Tr>
                  <Th textAlign="center">Exam</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Exam
                  link="/practice/midterm/practice_midterm_1.pdf"
                  solutionsLink="/practice/midterm/practice_midterm_solutions_1.pdf"
                >
                  Practice Midterm 1
                </Exam>
                <Exam
                  link="/practice/midterm/practice_midterm_2.pdf"
                  solutionsLink="/practice/midterm/practice_midterm_solutions_2.pdf"
                >
                  Practice Midterm 2
                </Exam>
                <Exam
                  link="/practice/final/practice_final_1.pdf"
                  solutionsLink="/practice/final/practice_final_solutions_1.pdf"
                >
                  Practice Final 1
                </Exam>
                <Exam
                  link="/practice/final/practice_final_2.pdf"
                  solutionsLink="/practice/final/practice_final_solutions_2.pdf"
                >
                  Practice Final 2
                </Exam>
              </Tbody>
            </Table>
          </Subsection>
        </Section>
      </Sections>
    </Layout>
  );
}
