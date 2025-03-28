import { useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';

/**
 * Options for the useFetch hook
 */
export type UseFetchOptions<TData> = Omit<
    UseQueryOptions<TData, Error, TData>,
    'queryKey' | 'queryFn'
>;

/**
 * Results returned by the useFetch hook
 */
export interface UseFetchResult<TData> {
    /**
     * The fetched data or null if not loaded
     */
    data: TData | null;

    /**
     * True while the initial load is in progress
     */
    isLoading: boolean;

    /**
     * Error object if the query failed
     */
    error: Error | null;

    /**
     * Function to manually refetch the data
     */
    refetch: () => Promise<any>;

    /**
     * Utility to reset the query state and data
     */
    reset: () => void;

    /**
     * All remaining React Query result properties
     */
    [key: string]: any;
}

/**
 * Custom React Query hook that simplifies data fetching with additional utilities
 * 
 * @example
 * // Basic usage
 * const { data, isLoading } = useFetch('todos', fetchTodos);
 * 
 * // With options
 * const { data } = useFetch(
 *   ['user', userId],
 *   () => fetchUser(userId),
 *   { staleTime: 5000 }
 * );
 */
function useFetch<TData>(
    queryKey: string | string[],
    fetchFn: () => Promise<TData>,
    options?: UseFetchOptions<TData>
): UseFetchResult<TData> {
    const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey];
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        refetch,
        ...rest
    } = useQuery<TData, Error>({
        queryKey: queryKeyArray,
        queryFn: fetchFn,
        ...options
    });

    /**
     * Resets the query state and removes its data from the cache
     * Useful for clearing sensitive data or forcing fresh reload next time
     */
    const reset = () => {
        queryClient.resetQueries({ queryKey: queryKeyArray });
    };

    return {
        data: data || null,
        isLoading,
        error,
        refetch,
        reset,
        ...rest
    };
}

export default useFetch;