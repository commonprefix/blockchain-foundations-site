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
            <SubsectionTitle>Exams and Practice</SubsectionTitle>
            <Table>
              <Thead>
                <Tr>
                  <Th textAlign="center">Exam</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Exam
                  link="/midterm/practice_midterm.pdf"
                  solutionsLink="/midterm/practice_midterm_solutions.pdf"
                >
                  Practice Midterm
                </Exam>
                <Exam
                  link="/midterm/midterm.pdf"
                  solutionsLink="/midterm/midterm_solutions.pdf"
                >
                  Spring 2026 Midterm
                </Exam>
                <Exam
                  link="/final/practice_final.pdf"
                  solutionsLink="/final/practice_final_solutions.pdf"
                >
                  Practice Final
                </Exam>
                <Exam
                  link="/final/final.pdf"
                  solutionsLink="/final/final_solutions.pdf"
                >
                  Spring 2026 Final
                </Exam>
              </Tbody>
            </Table>
          </Subsection>
        </Section>
      </Sections>
    </Layout>
  );
}
