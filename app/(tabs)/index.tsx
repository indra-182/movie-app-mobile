import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Image, ScrollView, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' />
      <ScrollView className='flex-1 px-5'>
        <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

        <View className='flex-1 mt-5'>
          <SearchBar
            placeholder='Search for a movie'
            onPress={() => router.push('/search')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
