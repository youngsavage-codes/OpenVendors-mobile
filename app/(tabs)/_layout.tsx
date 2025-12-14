import React from 'react'
import { Tabs } from 'expo-router'
import { Home2, People, Profile2User, SearchNormal1, Shop, User } from 'iconsax-react-nativejs'
import { colors } from '@/theme/colors'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,   // customize your theme colors
        tabBarInactiveTintColor: colors.gray400,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home2 size={21} color={color} variant='Bold' />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SearchNormal1 size={21} color={color} variant='Bold' />
          ),
        }}
      />

      <Tabs.Screen
        name="marketplace"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Shop size={21} color={color} variant='Bold' />
          ),
        }}
      />

      <Tabs.Screen
        name="myvendors"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Profile2User size={21} color={color} variant='Bold' />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <User size={21} color={color} variant="Bold" />
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout
