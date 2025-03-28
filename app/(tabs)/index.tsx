import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { fetchMovies } from '../services/api';
import useFetch from '../hooks/useFetch';

import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

export default function Index() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  /**
   * Fetches movie data using a custom useFetch hook with React Query configuration
   *
   * @param {Array} queryKey - Unique identifier for the query cache
   *   - ['movies', query] array helps cache and invalidate requests properly
   *   - Changes to this array will trigger refetches automatically
   *
   * @param {Function} queryFn - Async function that executes the API call
   *   - Wraps the fetchMovies service with current search query
   *   - Returns Promise with movie data
   *
   * @param {Object} options - React Query configuration options
   *   - @property {boolean} enabled - Controls if query should execute immediately
   *   - @property {number} staleTime - Duration (ms) before data becomes stale
   *     (1 minute in this case - data will be fresh for 60s before refetching)
   *
   * @returns {Object} - Query result object containing:
   *   - @property {Array} data - Movie data from API (aliased as 'movies')
   *   - @property {boolean} isLoading - Loading state indicator
   *   - @property {Error|null} error - Error object if request failed
   *   - @property {Function} refetch - Manual refetch trigger function
   */
  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useFetch(['movies', query], () => fetchMovies({ query }), {
    enabled: true, // Fetches immediately when component mounts
    staleTime: 1000 * 60 * 1, // Data remains fresh for 1 minute
  });

  const renderListHeader = () => (
    <>
      <Image source={images.bg} className='absolute w-full z-0' />
      <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

      <View className='mt-5 px-5'>
        <SearchBar
          placeholder='Search for a movie'
          onPress={() => router.push('/search')}
        />
      </View>

      <Text className='text-lg text-white font-bold mt-5 mb-3'>
        Latest Movies
      </Text>
    </>
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View className='items-center justify-center mt-10'>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      );
    }

    if (error) {
      return (
        <View className='items-center mt-10 px-5'>
          <Text className='text-center text-red-600'>
            An error occurred. Please try again later.
          </Text>
          <TouchableOpacity
            className='mt-3 bg-blue-600 py-2 px-4 rounded-full'
            onPress={() => refetch()}
          >
            <Text className='text-white'>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Text className='text-gray-400 text-center mt-4 px-5'>
        No movies found
      </Text>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <FlatList
        className='flex-1 mt-2 pb-32'
        contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 80 }}
        data={!isLoading && !error ? movies : []}
        keyExtractor={(item) => item?.id?.toString()}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </SafeAreaView>
  );
}
