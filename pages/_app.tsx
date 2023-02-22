import type { AppProps } from "next/app";
import "public/styles/compile-css/global.css";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient, QueryCache } from "react-query";
import UserProvider from "context/UserProvider";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster, toast } from "react-hot-toast";
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err: any) => toast.error(err.message),
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <SessionProvider session={session}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
