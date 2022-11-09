import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

// THEMES
import { theme } from "../theme";

// COMPONENTS
import Banner from "../components/Auth/Banner";
import client from "../lib/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
        <ApolloProvider client={client} >
             <Component {...pageProps} />
        </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
