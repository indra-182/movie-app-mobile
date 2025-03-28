import { useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';

/**
 * Custom React Query hook that simplifies data fetching with additional utilities
 * 
 * @template TData - Type of the data returned by the query
 * 
 * @param {string | string[]} queryKey - Unique identifier for the query cache.
 *   Can be a string or array of strings. Arrays are useful for dependent queries.
 *   Example: ['movies', 'popular'] or 'user-profile'
 * 
 * @param {() => Promise<TData>} fetchFn - Asynchronous function that returns the data.
 *   This function should handle all API communication and error throwing.
 *   Example: () => axios.get('/api/movies').then(res => res.data)
 * 
 * @param {Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>} [options] - 
 *   Optional configuration object for the query with the following common properties:
 *   - @property {boolean} [enabled] - Whether the query should execute automatically
 *   - @property {number} [staleTime] - Duration (ms) before data becomes stale
 *   - @property {number} [cacheTime] - Duration (ms) to keep unused data in cache
 *   - @property {boolean} [refetchOnMount] - Whether to refetch when component mounts
 *   - @property {Function} [onSuccess] - Callback when query succeeds
 *   - @property {Function} [onError] - Callback when query fails
 * 
 * @returns {Object} - Query result object with enhanced functionality:
 *   - @property {TData | null} data - The fetched data or null if not loaded
 *   - @property {boolean} isLoading - True while the initial load is in progress
 *   - @property {Error | null} error - Error object if the query failed
 *   - @property {Function} refetch - Function to manually refetch the data
 *   - @property {Function} reset - Utility to reset the query state and data
 *   - @property {...Object} ...rest - All remaining React Query result properties
 *     (isFetching, isError, isSuccess, status, etc.)
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