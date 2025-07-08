import { Code, Link } from '@chakra-ui/react';
import { Address, Id } from 'common/id';
import NextLink from 'next/link';

export interface ObjectLinkProps {
  id: string;
  short?: boolean;
  href: string;
}

export function ObjectLink({ id, short = false, href }: ObjectLinkProps) {
  const text = short ? `${id.substring(0, 16)}...` : id;

  return (
    <NextLink href={href}>
      <Code>
        <Link as="span">{text}</Link>
      </Code>
    </NextLink>
  );
}

export interface AddressLinkProps {
  id: Address;
  short?: boolean;
}

export function AddressLink({ id, short }: AddressLinkProps) {
  return <ObjectLink id={id} short={short} href={`/explorer/addr/${id}`} />;
}

export interface AddressLinkProps {
  id: Id;
  short?: boolean;
}

export function TransactionLink({ id, short }: AddressLinkProps) {
  return <ObjectLink id={id} short={short} href={`/explorer/tx/${id}`} />;
}

export interface BlockLinkProps {
  id: Id;
  short?: boolean;
}

export function BlockLink({ id, short }: BlockLinkProps) {
  return <ObjectLink id={id} short={short} href={`/explorer/block/${id}`} />;
}
