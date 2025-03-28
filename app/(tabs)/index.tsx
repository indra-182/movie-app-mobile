import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

import useFetch from '../hooks/useFetch';
import { fetchMovies } from '../services/api';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const Index = () => {
  const router = useRouter();

  const {
    data: movies,
    isLoading,
    isError: moviesError,
    refetch,
  } = useFetch(() => fetchMovies({ query: '' }));

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size='large'
          color='#AB8BFF'
          className='mt-10 self-center'
        />
      );
    }

    if (moviesError) {
      return (
        <View className='items-center mt-10 px-5'>
          <Text className='text-md text-center text-red-700'>
            {moviesError.message}
          </Text>
          <TouchableOpacity
            className='mt-3 bg-violet-400 py-2 px-4 rounded-full'
            onPress={() => refetch()}
          >
            <Text className='text-secondary text-base'>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className='flex-1 mt-5'>
        <SearchBar
          onPress={() => router.push('/search')}
          placeholder='Search for a movie'
        />

        <View className='mt-5'>
          <Text className='text-lg text-white font-bold mb-3'>
            Latest Movies
          </Text>

          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapper}
            className='mt-2 pb-32'
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='absolute w-full z-0'
        resizeMode='cover'
      />

      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = {
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'flex-start' as const,
    gap: 20,
    paddingRight: 5,
    marginBottom: 10,
  },
};

export default Index;
