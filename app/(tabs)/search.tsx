import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';

import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

import useFetch from '../hooks/useFetch';
import { fetchMovies } from '../services/api';

import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    isLoading,
    isError,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      searchQuery.trim() ? refetch() : reset();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList
        className='px-5'
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
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
              <Text className='text-red-500 px-5 my-3'>
                Error: {isError.message}
              </Text>
            )}

            {!isLoading &&
              !isError &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className='text-xl text-white font-bold'>
                  Search Results for{' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !isError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim()
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
