import { useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import useInfiniteMovies from '../hooks/useInfiniteMovies';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import MovieCard from '../components/MovieCard';

const Index = () => {
  const flatListRef = useRef<FlatList>(null);

  const {
    movies,
    isLoading,
    isError,
    isLoadingMore,
    hasMore,
    loadMore,
    refetch,
  } = useInfiniteMovies({ query: '', initialLoad: true });

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

            <Text className='mt-5 text-xl text-white font-bold'>
              Latest Movies
            </Text>

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
          </>
        }
      />
    </View>
  );
};

export default Index;
