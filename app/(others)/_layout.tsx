import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return <Stack screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name='vendorProfile' />
    <Stack.Screen name='selectProfessional' />
    <Stack.Screen name='setBookingDetails' />
    <Stack.Screen name='firstTimeVisit' />
    <Stack.Screen name='orderSummery' />
    <Stack.Screen name='joinWaitlist' />
    <Stack.Screen name='teamDetails' />
  </Stack>
}

export default _layout