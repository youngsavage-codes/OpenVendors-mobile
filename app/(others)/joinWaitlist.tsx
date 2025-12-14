import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'
import IconButton from '@/component/shared/IconButton'
import { ArrowLeft } from 'iconsax-react-nativejs'
import { router } from 'expo-router'

const JoinWaitlist = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: 20}}>
        <SafeAreaView style={{flex: 1}}>
            <IconButton onPress={() => router.back()}>
                <ArrowLeft />
            </IconButton>
            <Text>JoinWaitlist</Text>
        </SafeAreaView>
    </View>
  )
}

export default JoinWaitlist

const styles = StyleSheet.create({})