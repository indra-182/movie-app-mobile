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

const fetchMovies = async ({ query }: { query: string }) => {
    try {
        const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await tmdbApi.get(endpoint);

        return response.data.results;
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