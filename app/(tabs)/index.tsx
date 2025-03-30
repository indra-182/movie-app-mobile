import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

import useInfiniteMovies from '../hooks/useInfiniteMovies';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const Index = () => {
  const router = useRouter();

  const {
    movies,
    isLoading,
    isError,
    isLoadingMore,
    hasMore,
    loadMore,
    refetch,
  } = useInfiniteMovies({ query: '', initialLoad: true });

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList
        className='flex-1'
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        onEndReached={() => {
          if (hasMore && !isLoadingMore) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className='w-12 h-10 mt-20 mb-5 mx-auto'
            />

            <View className='px-5 mt-5'>
              <SearchBar
                onPress={() => router.push('/search')}
                placeholder='Search for a movie'
              />
            </View>

            <Text className='text-lg text-white font-bold mb-3 px-5 mt-5'>
              Latest Movies
            </Text>

            {isLoading && (
              <ActivityIndicator
                size='large'
                color='#AB8BFF'
                className='mt-10 self-center'
              />
            )}

            {isError && (
              <View className='items-center mt-10 px-5'>
                <Text className='text-md text-center text-red-700'>
                  {isError.message}
                </Text>
                <TouchableOpacity
                  className='mt-3 bg-violet-400 py-2 px-4 rounded-full'
                  onPress={() => refetch()}
                >
                  <Text className='text-secondary text-base'>Try Again</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        }
        ListFooterComponent={
          isLoadingMore ? (
            <View className='py-5 items-center'>
              <ActivityIndicator size='small' color='#AB8BFF' />
              <Text className='text-gray-400 mt-2'>Loading more movies...</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Index;
