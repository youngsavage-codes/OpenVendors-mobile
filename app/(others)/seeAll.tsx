import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Services from '@/component/seeAllScreens/services'
import { colors } from '@/theme/colors'
import { useLocalSearchParams } from 'expo-router'

const SeeAll = () => {
  const { type, vendor } = useLocalSearchParams();
  const vendorObj = JSON.parse(vendor);
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      {
        type === 'service' && (
          <Services vendor={vendorObj} />
        )
      }
    </View>
  )
}

export default SeeAll

const styles = StyleSheet.create({})