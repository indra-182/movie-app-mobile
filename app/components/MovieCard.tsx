import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface MovieCardProps {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <Link href={`/movie/${id}`} asChild>
      <Pressable
        className={`w-[30%] mb-6 rounded-lg overflow-hidden`}
        style={[styles.cardShadow, isPressed && styles.cardPressed]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: false }}
      >
        {/* Card Content */}
        <View className='relative'>
          {/* Poster Image or Placeholder */}
          <View className='relative'>
            {poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
                }}
                className='w-full h-48 rounded-t-lg'
                style={styles.posterImage}
              />
            ) : (
              <View className='w-full h-48 bg-gray-800 items-center justify-center rounded-t-lg'>
                <Image
                  source={{
                    uri: 'https://via.placeholder.com/150',
                  }}
                  className='w-12 h-12 opacity-40'
                />
                <Text className='text-gray-500 mt-2'>No Poster</Text>
              </View>
            )}

            {/* Rating Badge */}
            <View className='absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex-row items-center'>
              <Image source={icons.star} className='w-3 h-3 mr-1' />
              <Text className='text-yellow-400 text-xs font-bold'>
                {vote_average.toFixed(1)}
              </Text>
            </View>

            {/* Bottom Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              className='absolute bottom-0 left-0 right-0 h-16 rounded-b-lg'
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>

          {/* Card Info Section */}
          <View className='px-2 py-2 bg-[#1D1D3B]'>
            <Text
              className='text-white text-sm font-semibold'
              numberOfLines={1}
            >
              {title}
            </Text>

            {releaseYear && (
              <Text className='text-gray-400 text-xs mt-1'>{releaseYear}</Text>
            )}
          </View>

          {/* Interactive Elements when pressed */}
          {isPressed && (
            <View className='absolute inset-0 bg-violet-800/20 rounded-lg flex items-center justify-center'>
              <View className='bg-violet-700/80 rounded-full p-2'>
                <Image
                  source={
                    icons.play || {
                      uri: 'https://img.icons8.com/ios-filled/50/ffffff/play--v1.png',
                    }
                  }
                  className='w-5 h-5'
                  style={{ tintColor: '#fff' }}
                />
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  posterImage: {
    backgroundColor: '#0f172a',
  },
});

export default MovieCard;
