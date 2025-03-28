import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import { TouchableOpacity, Image, Text, View } from 'react-native';

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    /**
     * Using Link with asChild prop to enable navigation while maintaining full control over the UI
     *
     * @param {boolean} asChild - When true, the Link component won't render an extra wrapper view.
     * Instead, it passes navigation capabilities to its single child component.
     *
     * Benefits:
     * - Avoids unnecessary view nesting in the component hierarchy
     * - Allows complete styling control via the child component
     * - Preserves all TouchableOpacity behaviors (press effects, etc.)
     * - Better performance by reducing rendered views
     *
     * Note: The child component (TouchableOpacity) must be able to handle press events.
     * Only one child element is allowed when using asChild.
     */
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        {poster_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
            }}
            className='w-full h-52 rounded-lg'
          />
        ) : (
          <View className='w-full h-52 bg-gray-800 items-center justify-center'>
            <Text className='text-gray-500'>No Image</Text>
          </View>
        )}

        <Text
          className='text-white text-sm font-semibold mt-2'
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className='flex-row items-center justify-start gap-x-1 mt-1'>
          <Image source={icons.star} className='size-4' />
          <Text className='text-yellow-400 text-xs font-bold'>
            {vote_average.toFixed(1)}
          </Text>
        </View>

        <View className='flex-row items-center justify-start gap-x-1 mt-1'>
          <Text className='text-gray-400 text-xs'>
            {release_date
              ? new Date(release_date).getFullYear()
              : 'Unknown Year'}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
