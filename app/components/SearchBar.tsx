import { View, TextInput, Image } from 'react-native';

import { icons } from '@/constants/icons';

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image
        source={icons.search}
        className='w-5 h-5'
        resizeMode='contain'
        tintColor='#AB8BFF'
      />
      <TextInput
        className='flex-1 ml-2 text-white'
        placeholder={placeholder}
        placeholderTextColor='#A8B5DB'
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
