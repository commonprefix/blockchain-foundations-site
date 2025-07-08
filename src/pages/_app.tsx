import 'client/styles/global.css';

import { ChakraProvider } from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default trpc.withTRPC(App);
