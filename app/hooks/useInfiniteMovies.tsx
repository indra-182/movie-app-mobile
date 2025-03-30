import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMovies } from '../services/api';
import { useMemo } from 'react';

interface UseInfiniteMoviesProps {
  query: string;
  initialLoad?: boolean;
}

interface UseInfiniteMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  isError: Error | null;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
  reset: () => void;
}

const useInfiniteMovies = ({
  query,
  initialLoad = false,
}: UseInfiniteMoviesProps): UseInfiniteMoviesResult => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['movies', query],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchMovies({ query, page: pageParam as number });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: { page: number; total_pages: number }) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    enabled: initialLoad || !!query.trim(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.results) || [],
    [data]
  );

  // Custom function to load more data when scrolling
  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['movies', query] });
  };

  return {
    movies,
    isLoading,
    isError: isError ? (error as Error) : null,
    isLoadingMore: isFetchingNextPage,
    hasMore: !!hasNextPage,
    loadMore,
    refetch: async () => {
      await refetch();
    },
    reset,
  };
};

export default useInfiniteMovies;
