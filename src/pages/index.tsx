import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Link,
  ListItem,
  SimpleGrid,
  Stack,
  UnorderedList,
  useColorModeValue
} from '@chakra-ui/react';
import Layout from 'client/components/layout';
import {
  Section,
  Sections,
  SectionTitle,
  SubectionText,
  Subsection,
  SubsectionLocation,
  SubsectionTitle,
  SubsectionTitleDate,
  SubsubsectionTitle,
  TeachingTeamMember
} from 'client/components/section';
import TitleSection from 'client/components/titleSection';
import { euDate, euTime } from 'common/date';

interface SyllabusItem {
  title: string;
  date: Date;
  location?: string;
  content: (JSX.Element | string)[];
  type?: 'psetSoft' | 'psetHard' | 'theoryExercise' | 'exam' | 'workshop';
}

interface SyllabusWeek {
  title: string;
  items: SyllabusItem[];
}

const softGradingDeadlineMessage =
  'The grader will test your node for you to get feedback. This is not graded. Please check out the PSETs tab for more information.';
const hardGradingDeadlineMessage =
  'The grader will test your node and give you a grade. Please check out the PSETs tab for more information.';
const theoryExerciseDeadlineMessage =
  'This will be a short theory exercise to help you practice for the exam. Please check out the PSETs tab for more information.';

const syllabus: SyllabusWeek[] = [
  {
    title: 'Week 1',
    items: [
      {
        title: 'Lecture 1: Money',
        date: new Date(2026, 1, 9, 13, 0),
        content: [
          'Administrivia',
          'Money as a social construct',
          'The network model',
          'The non-eclipsing assumption',
          'The gossip protocol'
        ]
      },
      {
        title: 'Workshop 1: TypeScript',
        date: new Date(2026, 1, 11, 18, 0),
        location: '1.1.29, old ECE building',
        content: [
          'Setting up a TypeScript project',
          'TypeScript basics',
          'Building your project'
        ],
        type: 'workshop'
      },
      {
        title: 'Lecture 2: The Adversary',
        date: new Date(2026, 1, 12, 13, 0),
        content: [
          'The adversary A',
          'The security parameter κ',
          'The honest protocol Π',
          'The adversarial model',
          'Probabilistic polynomial-time adversaries',
          'Negligible functions',
          'Game-based security',
          'Security proofs by computation reduction',
          'Proofs by contradiction and forward proofs'
        ]
      },
      {
        title: 'Workshop 2: Networking',
        date: new Date(2026, 1, 13, 18, 0),
        location: '1.1.29, old ECE building',
        content: [
          'TCP/IP socket connections',
          'Establishing a connection',
          'Receiving and parsing data'
        ],
        type: 'workshop'
      }
    ]
  },
  {
    title: 'Week 2',
    items: [
      {
        title: 'Lecture 3: Primitives',
        date: new Date(2026, 1, 16, 13, 0),
        content: [
          'The hash function: H',
          'Preimage resistance, second preimage resistance, collision resistance',
          'Collision resistance implies preimage resistance',
          'Preimage resistance implies second preimage resistance',
          'Public/private keys',
          'Signature schemes',
          'Signature correctness',
          'Existential unforgeability',
          'Ledgers'
        ]
      },
      {
        title: 'Problem Set 1 Soft Deadline',
        date: new Date(2026, 1, 18, 14, 0),
        content: [softGradingDeadlineMessage],
        type: 'psetSoft'
      },
      {
        title: 'Lecture 4: Transactions',
        date: new Date(2023, 0, 19, 13, 30),
        content: [
          'Transactions',
          'Inputs and outputs',
          'The transaction graph',
          'Change',
          'Multiple inputs',
          'Multiple outputs',
          'The UTXO model',
          'The law of conservation',
          'Verifying a transaction'
        ]
      },
      {
        title: 'Problem Set 1 Hard Deadline',
        date: new Date(2026, 1, 20, 14, 0),
        content: [hardGradingDeadlineMessage],
        type: 'psetHard'
      },
      {
        title: 'Workshop 3: Promises and Events',
        date: new Date(2026, 1, 20, 18, 0),
        location: '1.1.29, old ECE building',
        content: ['JavaScript promises', 'Async/await', 'Event emitters'],
        type: 'workshop'
      }
    ]
  },
  {
    title: 'Week 3',
    items: [
      {
        title: 'Lecture 5: Blocks',
        date: new Date(2026, 1, 23, 13, 0),
        content: [
          'Views in disagreement',
          'Double spending',
          'The network delay Δ',
          "Simple ideas don't work!",
          'Rare events',
          'Blocks',
          'Proof-of-work',
          'The mining target T',
          'The proof-of-work equation',
          'The mining algorithm',
          'Block freshness',
          'The genesis block G',
          'Chains'
        ]
      },
      {
        title: 'Problem Set 2 Soft Deadline',
        date: new Date(2026, 1, 25, 14, 0),
        content: [softGradingDeadlineMessage],
        type: 'psetSoft'
      },
      {
        title: 'Lecture 6: Chains',
        date: new Date(2026, 1, 26, 13, 0),
        content: [
          'Hash chains',
          'The number n of parties',
          'The number t of adversarial parties',
          'The hashing power q',
          'Rare events are irregular',
          'Convergence opportunities and periods of silence',
          'The honest majority assumption',
          'The longest chain rule',
          'Coinbase',
          'Fees',
          'Mempools'
        ]
      },
      {
        title: 'Problem Set 2 Hard Deadline',
        date: new Date(2026, 1, 27, 14, 0),
        content: [hardGradingDeadlineMessage],
        type: 'psetHard'
      }
    ]
  },
  {
    title: 'Week 4',
    items: [
      {
        title: 'Lecture 7: Chain Virtues',
        date: new Date(2026, 2, 2, 13, 0),
        content: [
          'Temporary forks',
          'Convergence',
          'The Nakamoto race',
          'Chain Growth, Common Prefix, Chain Quality',
          'Censorship',
          'Majority attacks'
        ]
      },
      {
        title: 'Problem Set 3 Soft Deadline',
        date: new Date(2026, 2, 4, 14, 0),
        content: [softGradingDeadlineMessage],
        type: 'psetSoft'
      },
      {
        title: 'Lecture 8: Attacks',
        date: new Date(2026, 2, 5, 13, 0),
        content: [
          'Healing',
          'Macroeconomic supply',
          'Selfish mining',
          'Mining pools'
        ]
      },
      {
        title: 'Problem Set 3 Hard Deadline',
        date: new Date(2026, 2, 6, 14, 0),
        content: [hardGradingDeadlineMessage],
        type: 'psetHard'
      }
    ]
  },
  {
    title: 'Week 5',
    items: [
      {
        title: 'Lecture 9: Variable Difficulty, Pools, Wallets',
        date: new Date(2026, 2, 9, 13, 0),
        content: [
          'CPU, GPU, ASIC mining',
          'Incentive compatibility',
          'Block size limits',
          'Transaction prioritization by fees',
          'Macroeconomic policy, reward adjustment',
          'The difficulty adjustment equation Τ_{j+1} = T_{j} (t_2 - t_1) / (mη)',
          'Mining pools, the light PoW equation: H(B) ≤ 2^z T',
          'The pooled mining protocol',
          'Cold, hot, and hardware wallets',
          'Wallet seeds, deterministic wallets'
        ]
      },
      {
        title: 'Theoretic Workshop 1',
        date: new Date(2026, 2, 11, 18, 0),
        location: '1.1.29, old ECE building',
        content: [
          'TBD'
        ],
        type: 'workshop'
      },
      {
        title: 'Lecture 10: Accounts and Balances, Merkle Trees',
        date: new Date(2026, 2, 12, 13, 0),
        content: [
          'The account model',
          'Transactions in the account model',
          'Balances',
          'Nonces',
          'The generic transition function δ',
          'Blockchain as a State Machine Replication mechanism',
          'UTXO vs accounts',
          'The file storage problem',
          'The Merkle Tree: compress, prove, verify',
          'Proofs of inclusion, succinctness',
          'Merkle Tree security proof by reduction from collision-resistant hashes'
        ]
      },
      {
        title: 'Theory Exercise 1 Deadline',
        date: new Date(2026, 2, 13, 14, 0),
        content: [theoryExerciseDeadlineMessage],
        type: 'theoryExercise'
      }
    ]
  },
  {
    title: 'Week 6',
    items: [
      {
        title: 'Midterm Exam',
        date: new Date(2026, 2, 16, 13, 0),
        content: ['More information available on Ed'],
        type: 'exam'
      },
      {
        title: 'Theoretic Workshop 2',
        date: new Date(2026, 2, 18, 18, 0),
        location: '1.1.29, old ECE building',
        content: [
          'TBD'
        ],
        type: 'workshop'
      },
      {
        title: 'Lecture 11: Light Clients, Backbone Warmup',
        date: new Date(2026, 2, 19, 13, 0),
        content: [
          'The problem of scalability in blockchains: Scaling computation, communication, and storage',
          'From x-bar to x using Merkle Trees',
          'The Simple Payment Verification (SPV) protocol',
          'The header chain',
          'Miners, Full Nodes, Light Nodes',
          'Chain virtues for light nodes',
          'Privacy concerns for light nodes',
          'Random Oracles, formally',
          'The synchrony assumption Δ = 1'
        ]
      },
      {
        title: 'Theory Exercise 2 Deadline',
        date: new Date(2026, 2, 20, 14, 0),
        content: [theoryExerciseDeadlineMessage],
        type: 'theoryExercise'
      }
    ]
  },
  {
    title: 'Week 7',
    items: [
      {
        title: 'Lecture 12: Security in Earnest (I)',
        date: new Date(2026, 2, 23, 13, 0),
        content: [
          'The Environment and the Execution',
          'The Rushing Adversary',
          'The Sybil Adversary',
          'The Network model, the gossiping model',
          'The Non-Eclipsing Assumption',
          'The honest backbone protocol',
          'Maintaining, adopting, and having chains',
          'Proof-of-work',
          'The q-bounded Random Oracle',
          'The Static Difficulty assumption',
          'Chain validation; the δ* function',
          'Successful rounds',
          'Convergence opportunities',
          'Formal definition of Chain Virtues',
          'Common Prefix, the parameter k',
          'Chain Quality, the parameters μ and ℓ',
          'Chain Growth, the parameters τ and s',
          'The formal honest majority assumption: t < (1 - δ)(n - t)',
          'The honest advantage δ',
          'Convergence Opportunities are useful: The Pairing Lemma and its proof'
        ]
      },
      {
        title: 'Problem Set 4 Soft Deadline',
        date: new Date(2026, 2, 25, 14, 0),
        content: [softGradingDeadlineMessage],
        type: 'psetSoft'
      },
      {
        title: 'Lecture 13: Security in Earnest (II)',
        date: new Date(2026, 2, 26, 13, 0),
        content: [
          'Ledger Safety and Liveness, formally. The liveness parameter u.',
          'Proof of Safety from Common Prefix',
          'Proof of Liveness from Chain Quality and Chain Growth; u = max((ℓ + k) / τ, s)',
          'The Chain Growth Lemma and its proof',
          'The successful round indicator X',
          'The convergence opportunity indicator Y',
          'The adversarial success indicator Z',
          'The expectations of X, Y, and Z',
          "Bernoulli's inequality",
          'Lower and upper bounds on the expectation of X',
          'Lower bounds on the expectation of Y',
          'Good things converge: The Chernoff bound',
          'The world is good, usually: Typical executions',
          'The Chernoff duration λ',
          'The Chernoff error ε',
          'Proof of Typicality Theorem',
          'The Balancing Equation: 3ε + 3f ≤ δ',
          'A plot of X, Y, and Z with 3f, 3ε and δ'
        ]
      },
      {
        title: 'Problem Set 4 Hard Deadline',
        date: new Date(2026, 2, 27, 14, 0),
        content: [hardGradingDeadlineMessage],
        type: 'psetHard'
      }
    ]
  },
  {
    title: 'Week 8',
    items: [
      {
        title: 'Lecture 14: Security in Earnest (III)',
        date: new Date(2026, 2, 30, 13, 0),
        content: [
          'Reminder of bounds on the expectations of X and Y',
          'Upper bound on the expectation of Z',
          'Typical bounds, and proof that Z ≤ Y',
          'Chains grow: The Chain Growth theorem and its proof',
          'The Patience Lemma and its proof',
          'The Common Prefix theorem and its proof',
          'Discussion on the relationship between ε and λ',
          "You can't have it all: Discussion on the parametrization options for ε, f, δ"
        ]
      },
      {
        title: 'Problem Set 5 Soft Deadline',
        date: new Date(2026, 3, 1, 14, 0),
        content: [softGradingDeadlineMessage],
        type: 'psetSoft'
      },
      {
        title: 'No Lecture!',
        date: new Date(2026, 3, 2),
        content: []
      },
      {
        title: 'Problem Set 5 Hard Deadline',
        date: new Date(2026, 3, 3, 14, 0),
        content: [hardGradingDeadlineMessage],
        type: 'psetHard'
      }
    ]
  },
  {
    title: 'Week 9',
    items: [
      {
        title: 'Lecture 15: Longest Chain Proof of Stake (I)',
        date: new Date(2026, 3, 20, 13, 0),
        content: [
          "Proof of Work's perils and environmental impact",
          'Proof of Work vs Proof of Stake',
          'Dangers of Proof of Stake',
          'The Proof of Stake equation',
        ]
      },
      {
        title: 'Problem Set 6 Soft Deadline',
        date: new Date(2026, 3, 22, 14, 0),
        content: [softGradingDeadlineMessage],
        type: 'psetSoft'
      },
      {
        title: 'Lecture 16: Longest Chain Proof of Stake (II)',
        date: new Date(2026, 3, 23, 13, 0),
        content: [
          "Proof of Work's perils and environmental impact",
          'Proof of Work vs Proof of Stake',
          'Dangers of Proof of Stake',
          'The Proof of Stake equation',
        ]
      }
    ]
  },
  {
    title: 'Week 10',
    items: [
      {
        title: 'Lecture 17: BFT Proof of Stake (I)',
        date: new Date(2026, 3, 27, 13, 0),
        content: [
          'Everything is a Race and Nakamoto Always Wins',
          'Verifiable Random Functions',
          'VRF correctness',
          'The unpredictability game',
          'Towards instant finality',
        ]
      },
      {
        title: 'Problem Set 6 Hard Deadline',
        date: new Date(2026, 3, 29, 14, 0),
        content: [hardGradingDeadlineMessage],
        type: 'psetHard'
      },
      {
        title: 'Theoretic Workshop 3',
        date: new Date(2026, 3, 29, 18, 0),
        location: '1.1.29, old ECE building',
        content: [
          'TBD'
        ],
        type: 'workshop'
      },
      {
        title: 'Lecture 18: BFT Proof of Stake (II)',
        date: new Date(2026, 3, 30, 13, 0),
        content: [
          'The Streamlet protocol and its proof of safety',
          'Accountability and slashing',
        ]
      },
      {
        title: 'Theory Exercise 3 Deadline',
        date: new Date(2026, 4, 1, 14, 0),
        content: [theoryExerciseDeadlineMessage],
        type: 'theoryExercise'
      }
    ]
  },
  {
    title: 'Week 11',
    items: [
      {
        title:
          'Lecture 19: Proof of Stake Conclusion',
        date: new Date(2026, 4, 4, 13, 0),
        content: [
          'Permissioned vs Proof of Stake: static vs dynamic stake',
          'Stake grinding attacks and their mitigations',
          'Stake unbonding and long range attacks and their mitigations',
        ]
      },
      {
        title:
          'Lecture 20: Leonardos\' Lecture',
        date: new Date(2026, 4, 6, 13, 0),
        content: [
          'TBD'
        ]
      }
    ]
  },
  {
    title: 'Finals Week',
    items: [
      {
        title: 'Theoretic Workshop 4',
        date: new Date(2026, 5, 17, 18, 0),
        location: '1.1.29, old ECE building',
        content: [
          'TBD'
        ],
        type: 'workshop'
      },
      {
        title: 'Theory Exercise 4 Deadline',
        date: new Date(2026, 5, 19, 14, 0),
        content: [theoryExerciseDeadlineMessage],
        type: 'theoryExercise'
      },
      {
        title: 'Take-Home Final Exam',
        date: new Date(2026, 5, 22),
        content: ['More information will be posted soon.'],
        type: 'exam'
      }
    ]
  }
];

export default function HomePage() {
  const section1SubsectionTitleColor = 'gray.400';
  const primaryColor = 'blue.400';

  const colors = {
    psetSoft: 'orange.400',
    psetHard: 'red.400',
    theoryExercise: 'red.400',
    exam: 'green.500',
    workshop: 'purple.400'
  } as const;

  return (
    <Layout
      title="Blockchain Foundations"
      description="Blockchains are a new field of computer science which combines cryptography, distributed systems, and security. In this course, we dive deep into the fundamentals: what are blockchains, how do they work, and why are they secure?"
    >
      <Sections>
        <TitleSection />

        <Section id="logistic">
          <SectionTitle>Logistics and Details</SectionTitle>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Administrativia
            </SubsectionTitle>
            <SubectionText>
              Extended course information is available{' '}
              <Link
                zIndex={5}
                color={primaryColor}
                href="https://docs.google.com/document/d/1VqJBuftJs5shI2QiEPjbFPevMXpAsnrLn6Mp7hOrTac/edit?usp=sharing"
                target="_blank"
              >
                here
              </Link>
              .
            </SubectionText>
          </Subsection>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Meeting Times
            </SubsectionTitle>
            <SubectionText>
              Monday, Thursday 13:00-15:00
              <br />
              old ECE building, room 1.1.29
            </SubectionText>
          </Subsection>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Course Description
            </SubsectionTitle>
            <SubectionText>
              Blockchains are a new field of computer science which combines
              cryptography, distributed systems, and security. In this course,
              we dive deep into the fundamentals: what are blockchains, how do
              they work, and why are they secure? <br />
              You will learn both the theory behind blockchains and how to
              implement them in practice. The lectures, as well as the midterm
              and final, will dive deep into the robust construction of
              proof-of-work and proof-of-stake blockchains. The problem sets
              will focus on the implementation of a blockchain node from
              scratch.
              <br />
            </SubectionText>
          </Subsection>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Prerequisites
            </SubsectionTitle>
            <SubectionText>
              Strong programming experience
              <br />
              Discrete math and computation theory
              <br />
              Basics of probabilities
            </SubectionText>
          </Subsection>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Grading
            </SubsectionTitle>
            <SubectionText>
              The grade for the course will be determined according to the
              following breakdown:
            </SubectionText>
            <UnorderedList pl={4}>
              <ListItem>Programming Exercises: 40%</ListItem>
              <ListItem>
                Theory Exercises (meant to help with exam studying): 5%
              </ListItem>
              <ListItem>Midterm: 20%</ListItem>
              <ListItem>Final: 35%</ListItem>
            </UnorderedList>
          </Subsection>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Course Textbook
            </SubsectionTitle>
            <SubectionText>
              The course textbook containing lecture notes is available{' '}
              <Link
                color={primaryColor}
                href="/blockchain-foundations.pdf"
                target="_blank"
              >
                here
              </Link>
              . It will be updated throughout the quarter.
            </SubectionText>
          </Subsection>

          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Questions or Concerns?
            </SubsectionTitle>
            <SubectionText>
            This term we will be using Piazza for class discussion. Rather than
            emailing questions to the teaching staff, we encourage you to post
            your questions on Piazza.
            <br/>
            Find our class signup link at:
            <br/>
            <Link color={primaryColor} href="https://piazza.com/national_technical_university_of_athens/spring2026/almaadvancedtopicsincryptography" target="_blank">
              https://piazza.com/national_technical_university_of_athens/spring2026/almaadvancedtopicsincryptography
            </Link>
            </SubectionText>
            <SubectionText>
              Otherwise, please reach out to{' '}
              <Link color={primaryColor} href="mailto:dionyziz@commonprefix.com">
                dionyziz@commonprefix.com
              </Link>
              .
            </SubectionText>
          </Subsection>

        </Section>
      </Sections>

      <Section id="syllabus" bg={useColorModeValue('gray.200', 'gray.700')}>

        <SectionTitle>Syllabus</SectionTitle>
        <SectionTitle>(All dates are tentative and subject to change)</SectionTitle>
        {syllabus.map(({ title, items }, index) => {
          return (
            <Stack key={index} width="full" spacing={2}>
              <SubsectionTitle>{title}</SubsectionTitle>

              <Stack key={index} width="full" spacing={0}>
                {items.map(
                  ({ title, date, location, content, type }, index) => {
                    const color = type ? colors[type] : primaryColor;
                    return (
                      <Subsection key={index}>
                        <Accordion allowToggle>
                          <AccordionItem border="none">

                            <AccordionButton
                              borderRadius="md"
                              p={2}
                              justifyContent={{
                                base: 'space-between',
                                md: 'start'
                              }}
                            >
                              <HStack spacing={4} textAlign="start">
                                <SubsubsectionTitle color={color}>
                                  {title}
                                </SubsubsectionTitle>
                                <SubsectionTitleDate
                                  display={{ base: 'none', lg: 'initial' }}
                                >
                                  { euDate(date) }
                                  { date.getHours() !== 0
                                    ? ` (${euTime(date)})`
                                    : ''
                                  }
                                </SubsectionTitleDate>
                                {location && (
                                  <SubsectionLocation
                                    display={{ base: 'none', lg: 'initial' }}
                                  >
                                    {location}
                                  </SubsectionLocation>
                                )}
                              </HStack>
                              <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              {content.map((item, index) => (
                                <SubectionText key={index}>
                                  • {item}
                                </SubectionText>
                              ))}
                            </AccordionPanel>

                          </AccordionItem>
                        </Accordion>
                      </Subsection>
                    );
                  }
                )}
              </Stack>
            </Stack>
          );
        })}
      </Section>

      <Section id="team" bg="blue.500" color="white">
        <SectionTitle>Teaching Team</SectionTitle>
        <SimpleGrid
          width="full"
          justifyItems="center"
          columns={2}
          spacing={{ sm: 8, md: 10 }}
        >

          <TeachingTeamMember
            name="Dr. Dionysis Zindros"
            workRole="Instructor"
            email="dionyziz@commonprefix.com"
            officeHoursDate={
              <>
                Tue 15:00-16:00,
                Wed 11:00-12:00
                <br />
              </>
            }
            officeHoursLocation="TBD"
            src="/images/dionysis.png"
            alt="Dionysis Zindros"
          />

          <TeachingTeamMember
            name="Prof. Nikos Leonardos"
            workRole="Instructor"
            email="nleon@di.uoa.gr"
            officeHoursDate={
              <>
                Upon request
                <br />
              </>
            }
            officeHoursLocation="CoReLab"
            src="/images/nikos.png"
            alt="Nikos Leonardos"
          />

          <TeachingTeamMember
            name="Nikolas Kamarinakis"
            workRole="Teaching Assistant"
            email="nikolas@commonprefix.com"
            officeHoursDate={
              <>
                Thu 15:00-16:00
                <br />
              </>
            }
            officeHoursLocation="CoReLab"
            src="/images/nikolas.jpg"
            alt="Nikolas Kamarinakis"
          />

          <TeachingTeamMember
            name="Odysseas Sofikitis"
            workRole="Teaching Assistant"
            email="odysseas@commonprefix.com"
            officeHoursDate={
              <>
                Mon 15:00-16:00
                <br />
              </>
            }
            officeHoursLocation="CoReLab"
            src="/images/odysseas.jpg"
            alt="Odysseas Sofikitis"
          />
        </SimpleGrid>

      </Section>
    </Layout>
  );
}
