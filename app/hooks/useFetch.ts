import { useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';

/**
 * A wrapper around TanStack Query's useQuery hook
 * @param queryKey - Unique key for this query
 * @param fetchFn - Function that returns a promise with the data
 * @param options - Additional options for useQuery
 */
function useFetch<TData>(
    queryKey: string | string[],
    fetchFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>
) {
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

    // Function to reset query data and state
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