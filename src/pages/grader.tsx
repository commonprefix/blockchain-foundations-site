import { Button, Input, Select, Spinner, Stack, Text } from '@chakra-ui/react';
import Layout from 'client/components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle
} from 'client/components/section';
import TitleSection from 'client/components/titleSection';
import { useState } from 'react';

declare global {
  interface Window {
    WebSocket: typeof WebSocket;
  }
}

const GRADER_URL = process.env.NEXT_PUBLIC_GRADER_URL;

export default function GraderPage() {
  const [ip, setIp] = useState<string>('');
  const [pset, setPset] = useState<number>();

  const [messages, setMessages] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const grade = () => {
    if (!GRADER_URL) return;
    if (!ip || !pset) return;
    setIsRunning(true);
    setMessages([]);
    const ws = new window.WebSocket(GRADER_URL);
    ws.onmessage = (event) => {
      const message: string = event.data;
      setMessages((messages) => [...messages, message]);
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({ ip, pset }));
    };
    ws.onclose = () => {
      setIsRunning(false);
    };
  };

  return (
    <Layout title="Grader" description="Marabu Grader">
      <Sections>
        <TitleSection title="Grader" />
        <Section id="grader">
          <Subsection>
            <Text>
              This page allows you to run your code against past graders to help
              you fix your code and make sure your previously implemented
              features are not broken by the addition of new code.
            </Text>
            <Text>
              <b>Warning:</b> This page is only giving you a mock grade for past
              PSETs for your use only. For submissions regarding the current
              week&apos;s PSET, you should check out Gradescope.
            </Text>
          </Subsection>
          {GRADER_URL ? (
            <>
              <Subsection>
                <SubsectionTitle>Parameters</SubsectionTitle>
                <Text>
                  Please input your node IP without including the port number.
                  The grader assumes your node is running on port 18018.
                </Text>
                <Stack maxW="400px">
                  <Input
                    required
                    placeholder="Node IP"
                    value={ip}
                    onChange={(event) => setIp(event.target.value)}
                  />
                  <Select
                    required
                    placeholder="Select PSET"
                    value={pset}
                    onChange={(event) => setPset(parseInt(event.target.value))}
                  >
                    <option value={1}>PSET 1</option>
                    <option value={2}>PSET 2</option>
                    <option value={3}>PSET 3</option>
                    <option value={4}>PSET 4</option>
                    <option value={5}>PSET 5</option>
                  </Select>
                  <Button
                    disabled={!ip || !pset || isRunning}
                    width="fit-content"
                    onClick={grade}
                  >
                    {isRunning ? <Spinner /> : 'Run Grader'}
                  </Button>
                </Stack>
              </Subsection>
              <Subsection>
                <SubsectionTitle>Grader Output</SubsectionTitle>
                {messages.map((message, index) => (
                  <Text key={index}>{message}</Text>
                ))}
              </Subsection>
              {isRunning && <Spinner />}
            </>
          ) : (
            <Subsection>
              <Text>The grader will be available after PSET 1.</Text>
            </Subsection>
          )}
        </Section>
      </Sections>
    </Layout>
  );
}
