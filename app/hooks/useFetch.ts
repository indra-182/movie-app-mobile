import { useState, useEffect } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setIsError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setIsError(
                err instanceof Error ? err : new Error("An unknown error occurred")
            );
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setIsError(null);
        setIsLoading(false);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, isLoading, isError, refetch: fetchData, reset };
};

export default useFetch;