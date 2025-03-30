import axios from 'axios';

const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    }
}

const tmdbApi = axios.create({
    baseURL: TMDB_CONFIG.BASE_URL,
    headers: TMDB_CONFIG.headers
});


const fetchMovies = async ({ query, page = 1 }: { query: string; page?: number }) => {
    try {
        const endpoint = query
            ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
            : `/discover/movie?sort_by=popularity.desc&page=${page}`;

        const response = await tmdbApi.get(endpoint);

        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages,
            total_results: response.data.total_results
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch movies: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

const fetchMovieDetails = async (movieId: string) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch movie details: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export { fetchMovies, fetchMovieDetails };
// Add an empty default export to satisfy Expo Router
export default function APIComponent() {
    return null;
}