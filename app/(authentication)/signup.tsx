import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/component/shared/auth/authHeader'
import SocialAuth from '@/component/shared/auth/SocialAuth'
import { colors } from '@/theme/colors'
import AppTextInput from '@/component/shared/input'
import Separator from '@/component/shared/auth/Separator'
import AppButton from '@/component/shared/button'
import { fontFamily, fontSize, fontWeight } from '@/theme/fonts'
import AlreadyHaveAccount from '@/component/shared/auth/AlreadyHaveAccount'
import { router } from 'expo-router'
import TermsAndConditions from '@/component/shared/auth/TermsAndConditions'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleContinue = () => {
      console.log('Email:', email);
      console.log('Password:', password);
    };
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <SafeAreaView style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
        <AuthHeader title='Register' showBack />
        <SocialAuth
          onGoogle={() => console.log("Google")}
          onApple={() => console.log("Apple")}
          onFacebook={() => console.log("Facebook")}
        />
        <Separator text="Or register with email" />
        <View>
            <AppTextInput
                label="Name"
                placeholder="Enter your Name"
                value={email}
                onChangeText={setEmail}
                keyboardType='default'
                autoCapitalize="none"
            />

          <AppTextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppTextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TermsAndConditions />
          <AppButton
            title={"Register"}
            onPress={() => {}}
            variant="primary"
          />
          <AlreadyHaveAccount
            onPress={() => router.push("/(authentication)/signin")}
            questionText="Have an account?"
            actionText="Sign In"
          />
      </SafeAreaView>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})