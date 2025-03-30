import { View, Text, ImageBackground } from 'react-native';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import {
  House,
  Search,
  BookMarked,
  CircleUserRound,
} from 'lucide-react-native';
import { ReactNode } from 'react';

interface TabIconProps {
  focused: boolean;
  icon: ReactNode;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
        resizeMode='cover'
      >
        <View className='flex items-center justify-center'>{icon}</View>
        <Text className='text-secondary text-base font-semibold ml-2'>
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      {icon}
    </View>
  );
};

const _Layout: React.FC = () => {
  const activeIconColor = '#151312';
  const inactiveIconColor = '#A8B5DB';

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0D23',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              focused={focused}
              icon={
                <House
                  color={focused ? activeIconColor : inactiveIconColor}
                  size={20}
                />
              }
              title='Home'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              focused={focused}
              icon={
                <Search
                  color={focused ? activeIconColor : inactiveIconColor}
                  size={20}
                />
              }
              title='Search'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              focused={focused}
              icon={
                <BookMarked
                  color={focused ? activeIconColor : inactiveIconColor}
                  size={20}
                />
              }
              title='Saved'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              focused={focused}
              icon={
                <CircleUserRound
                  color={focused ? activeIconColor : inactiveIconColor}
                  size={20}
                />
              }
              title='Profile'
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
