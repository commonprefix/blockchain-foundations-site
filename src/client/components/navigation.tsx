import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { ReactElement } from 'react';

type NavLinkWrapperProps = React.PropsWithChildren<{
  href: string;
  active?: boolean;
}>;

type NavLinkProps = React.PropsWithChildren<{
  href: string;
}>;

const routes = [
  { title: 'Info', link: '/#logistic' },
  { title: 'Syllabus', link: '/#syllabus' },
  { title: 'Team', link: '/#team' },
  { title: 'Protocol', link: '/protocol' },
  { title: 'Explorer', link: '/explorer' },
  { title: 'PSETs', link: '/psets' },
  { title: 'Exams', link: '/exams' },
  { title: 'Grader', link: '/grader' }
] as const;

function NavLinkWrapper({
  href,
  active,
  children
}: NavLinkWrapperProps): ReactElement {
  if (active) return <>{children}</>;
  return (
    <NextLink href={href} passHref>
      {children}
    </NextLink>
  );
}

function NavLink({ href, children }: NavLinkProps): ReactElement {
  const active = false;

  const activeBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <NavLinkWrapper href={href} active={active}>
      <Link
        as="span"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700')
        }}
        background={active ? activeBgColor : 'none'}
      >
        {children}
      </Link>
    </NavLinkWrapper>
  );
}

export default function Navigation(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}
      borderBottomWidth={1}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
      position="sticky"
      top={0}
      width="full"
      zIndex={999}
    >
      <HStack h={16} align="center" justify="space-between" spacing={4}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          spacing={{ base: 4, lg: 8 }}
          align="center"
          justify="space-between"
          width="full"
        >
          <NavLinkWrapper href="/">
            <Text
              fontWeight={600}
              whiteSpace="nowrap"
              fontSize={{ base: 'md', sm: 'lg', md: 'xl', xl: '2xl' }}
            >
              Blockchain Foundations{' '}
              <chakra.span display={{ base: 'none', xl: 'inline' }}>
                (Spring 2026)
              </chakra.span>
            </Text>
          </NavLinkWrapper>
          <Flex alignItems="center" fontSize={{ base: 'sm', md: 'md' }}>
            <HStack spacing={{ base: 2, lg: 4 }}>
              <HStack
                as={'nav'}
                width="full"
                spacing={{ base: 2, xl: 4 }}
                display={{ base: 'none', lg: 'flex' }}
              >
                {routes.map(({ title, link }) => (
                  <NavLink key={title} href={link}>
                    {title}
                  </NavLink>
                ))}
              </HStack>
              <Button aria-label="Toggle color mode" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </HStack>
          </Flex>
        </HStack>
      </HStack>
      {isOpen ? (
        <Box pb={4} display={{ lg: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {routes.map(({ title, link }) => (
              <NavLink key={title} href={link}>
                {title}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
