import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

import useInfiniteMovies from '../hooks/useInfiniteMovies';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const flatListRef = useRef<FlatList>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const {
    movies,
    isLoading,
    isError,
    isLoadingMore,
    hasMore,
    loadMore,
    refetch,
    reset,
  } = useInfiniteMovies({
    query: debouncedQuery,
    initialLoad: false,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      reset();
    }
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View className='py-5 items-center'>
        <ActivityIndicator size='small' color='#AB8BFF' />
        <Text className='text-gray-400 mt-2'>Loading more movies...</Text>
      </View>
    );
  };

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList
        ref={flatListRef}
        className='px-5'
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={() => {
          if (hasMore && !isLoadingMore) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='none'
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar
                placeholder='Search for a movie'
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size='large'
                color='#AB8BFF'
                className='my-3'
              />
            )}

            {isError && (
              <View className='items-center my-3'>
                <Text className='text-red-500 px-5'>
                  Error: {isError.message}
                </Text>
                <TouchableOpacity
                  className='mt-3 bg-violet-500 py-2 px-4 rounded-full'
                  onPress={() => refetch()}
                >
                  <Text className='text-white'>Try Again</Text>
                </TouchableOpacity>
              </View>
            )}

            {!isLoading && !isError && debouncedQuery && movies.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for{' '}
                <Text className='text-accent'>{debouncedQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !isError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {debouncedQuery
                  ? 'No movies found'
                  : 'Start typing to search for movies'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
