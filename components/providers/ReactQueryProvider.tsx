"use client";


import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(() => new QueryClient());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            //staleTime: 15 * 60 * 1000, // 15 minutes
            staleTime: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  // Note, typically gcTime should be longer than staleTime. Here's why:
  // staleTime determines how long data is considered "fresh" before React Query will trigger a background refetch
  // gcTime determines how long inactive data is kept in the cache before being removed entirely
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}