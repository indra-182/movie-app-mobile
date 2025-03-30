import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query';

interface UseFetchOptions {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchOnWindowFocus?: boolean;
}

const useFetch = <T>(
    queryKey: QueryKey,
    fetchFunction: () => Promise<T>,
    options: UseFetchOptions = {}
) => {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: fetchFunction,
        enabled: options.enabled !== false, // Default to true if not specified
        staleTime: options.staleTime || 1000 * 60 * 5, // Default 5 minutes
        gcTime: options.cacheTime || 1000 * 60 * 30, // Default 30 minutes
        refetchOnWindowFocus: options.refetchOnWindowFocus ?? true, // Default true
    });

    const reset = () => queryClient.removeQueries({ queryKey });


    return {
        data: data || null,
        isLoading,
        isError: error ? error as Error : null,
        refetch: async () => { await refetch() },
        reset,
    };
};

export default useFetch;