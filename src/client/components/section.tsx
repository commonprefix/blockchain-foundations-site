import {
  Box,
  chakra,
  Heading,
  Link,
  Stack,
  Text,
  TextProps,
  VStack
} from '@chakra-ui/react';
import Image from 'next/image';

export type SectionsProps = React.PropsWithChildren<unknown>;
export type SectionProps = React.PropsWithChildren<{
  id: string;
  bg?: string;
  color?: string;
}>;
export type SubsectionProps = React.PropsWithChildren<unknown>;
export type SectionTitleProps = React.PropsWithChildren<unknown>;
export type SubsectionTitleProps = React.PropsWithChildren<{
  color?: string;
  isMarkdown?: boolean;
}>;
export type SubsectionTextProps = React.PropsWithChildren<unknown>;
export type SyllabusLinkProps = React.PropsWithChildren<{
  href: string;
}>;
export interface TeachingTeamMemberProps {
  name: string;
  workRole: string;
  email: string;
  officeHoursDate: string | JSX.Element;
  officeHoursLocation?: string;
  src: string;
  alt: string;
}

export function Sections({ children }: SectionsProps) {
  return <VStack spacing={0}>{children}</VStack>;
}

export function Section({ id, bg, color, children }: SectionProps) {
  return (
    <Box width="full">
      <chakra.div id={id} height={0} mt={-16} pb={16}>
        &nbsp;
      </chakra.div>
      <VStack bg={bg} color={color} p={{ base: 6, sm: 8, md: 10 }} spacing={6}>
        {children}
      </VStack>
    </Box>
  );
}

export function Subsection({ children }: SubsectionProps) {
  return (
    <Stack width="full" spacing={2}>
      {children}
    </Stack>
  );
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <Heading fontSize="4xl">{children}</Heading>;
}

export function SubsectionTitle({
  color,
  children,
  isMarkdown
}: SubsectionTitleProps) {
  return (
    <Heading
      as="h3"
      fontSize={{ base: '2xl', md: '3xl' }}
      color={color}
      css={
        isMarkdown && {
          paddingTop: 24,
          ':first-child': {
            paddingTop: 0
          }
        }
      }
    >
      {children}
    </Heading>
  );
}

export function SubsubsectionTitle({
  color,
  children,
  isMarkdown
}: SubsectionTitleProps) {
  return (
    <Heading
      as="h4"
      fontSize={{ base: 'xl', md: '2xl' }}
      color={color}
      css={
        isMarkdown && {
          paddingTop: 12,
          ':first-child': {
            paddingTop: 0
          }
        }
      }
    >
      {children}
    </Heading>
  );
}

export function SubsectionTitleDate(props: TextProps) {
  return (
    <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" {...props} />
  );
}

export function SubsectionLocation(props: TextProps) {
  return (
    <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" {...props} />
  );
}

export function SubectionText({ children }: SubsectionTextProps) {
  return <Text>{children}</Text>;
}

export function SyllabusLink({ href, children }: SyllabusLinkProps) {
  const primaryColor = 'blue.400';

  return (
    <Link color={primaryColor} href={href} target="_blank">
      {children}
    </Link>
  );
}

export function TeachingTeamMember({
  name,
  workRole,
  email,
  officeHoursDate,
  officeHoursLocation,
  src,
  alt
}: TeachingTeamMemberProps) {
  return (
    <VStack textAlign="center">
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        style={{ borderRadius: 25 }}
      />
      <VStack spacing={0}>
        <Text>{name}</Text>
        <Text fontStyle="italic">{workRole}</Text>
        <Link href={`mailto:${email}`} fontSize={{ base: 'sm', md: 'md' }}>
          {email}
        </Link>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'start' }}
          justify="start"
          textAlign={{ base: 'center', md: 'start' }}
          spacing={0}
          fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
        >
          <Text>Office Hours:&nbsp;</Text>
          <Text>{officeHoursDate}</Text>
        </Stack>
        {officeHoursLocation && (
          <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>
            Location: {officeHoursLocation}
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
