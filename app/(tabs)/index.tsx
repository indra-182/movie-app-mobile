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

export default function Index() {
  const router = useRouter();
  const query = '';

  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useFetch(['movies', query], () => fetchMovies({ query }), {
    enabled: true, // This will fetch immediately on component mount
    staleTime: 1000 * 60 * 1, // 1 minute
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

      <Text className='text-lg text-white font-bold mt-5 mb-3 px-9'>
        Popular Movies
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
        className='flex-1'
        contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 80 }}
        data={!isLoading && !error ? movies : []}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <TouchableOpacity
            className='bg-[#1D1D3B] mb-3 p-3 mx-4 rounded-lg flex-row items-center'
            // onPress={() => navigateToMovieDetails(item.id)}
          >
            {item.poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
                }}
                className='w-16 h-24 rounded-md mr-3'
              />
            ) : (
              <View className='w-16 h-24 bg-gray-800 rounded-md mr-3 items-center justify-center'>
                <Text className='text-gray-500'>No Image</Text>
              </View>
            )}
            <View className='flex-1'>
              <Text className='text-white text-base font-semibold'>
                {item.title}
              </Text>
              <Text className='text-gray-400 text-xs mt-1'>
                {item.release_date
                  ? new Date(item.release_date).getFullYear()
                  : 'Unknown Year'}
              </Text>
              <Text className='text-yellow-400 text-xs mt-1'>
                ★ {item.vote_average.toFixed(1)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
