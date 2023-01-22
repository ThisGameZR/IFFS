import type { AppProps } from "next/app";
import "public/styles/compile-css/global.css";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import UserProvider from "context/UserProvider";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <SessionProvider session={session}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
