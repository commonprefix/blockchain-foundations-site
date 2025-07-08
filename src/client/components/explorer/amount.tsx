import { Text } from '@chakra-ui/react';

export interface AmountProps {
  amount: number;
}

export function Amount({ amount }: AmountProps) {
  return (
    <Text as="span" fontWeight="bold">
      {amount / 10 ** 12} bu
    </Text>
  );
}
