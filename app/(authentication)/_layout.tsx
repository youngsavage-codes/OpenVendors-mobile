import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return <Stack screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='onboarding' />
    <Stack.Screen name='signin' />
    <Stack.Screen name='signup' />
    <Stack.Screen name='forgotpassword' />
  </Stack>
}

export default _layout