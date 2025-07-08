import { Box } from '@chakra-ui/react';

type ExplorerContainerProps = React.PropsWithChildren<unknown>;

export function ExplorerContainer({ children }: ExplorerContainerProps) {
  return <Box p={8}>{children}</Box>;
}
