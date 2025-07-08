import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

export interface TitleSectionProps {
  title?: string;
}

export default function TitleSection({ title }: TitleSectionProps) {
  return (
    <Stack
      width="full"
      textAlign="center"
      align="center"
      spacing={{ base: 8, md: 10 }}
      px={{ base: 10, md: 14 }}
      py={{ base: 20, md: 28 }}
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Box w="full" h={200} position="relative">
        <Image
          src="/images/birds.png"
          alt="Birds"
          fill
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
      >
        {title ? (
          title
        ) : (
          <>
            Blockchain Foundations
          </>
        )}
      </Heading>
    </Stack>
  );
}
