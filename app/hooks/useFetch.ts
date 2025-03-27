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
        isLoading: loading,
        error,
        refetch: fetch,
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
        loading,
        error,
        fetch,
        reset,
        ...rest
    };
}

export default useFetch;