import React, { useRef } from 'react';
import { TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { icons } from '@/constants/icons';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onPress,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null);

  // If it's being used as a button (like in Home screen)
  if (onPress && !onChangeText) {
    return (
      <TouchableOpacity
        className='flex-row items-center bg-[#1D1D3B] rounded-full px-4 py-3'
        onPress={onPress}
      >
        <Image
          source={icons.search}
          className='w-5 h-5'
          style={{ tintColor: '#A8B5DB' }}
        />
        <Text className='text-[#A8B5DB] ml-2'>{placeholder}</Text>
      </TouchableOpacity>
    );
  }

  // If it's being used as an input (like in Search screen)
  return (
    <View className='flex-row items-center bg-[#1D1D3B] rounded-full px-4 py-3'>
      <Image
        source={icons.search}
        className='w-5 h-5'
        style={{ tintColor: '#A8B5DB' }}
      />
      <TextInput
        ref={inputRef}
        className='flex-1 text-white ml-2'
        placeholder={placeholder}
        placeholderTextColor='#A8B5DB'
        value={value}
        onChangeText={onChangeText}
        autoCapitalize='none'
        autoCorrect={false}
      />
      {value ? (
        <TouchableOpacity
          onPress={() => {
            if (onChangeText) {
              onChangeText('');
              // Force focus after clearing
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }
          }}
        ></TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
