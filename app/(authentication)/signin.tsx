import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/component/shared/auth/authHeader'
import SocialAuth from '@/component/shared/auth/SocialAuth'
import { colors } from '@/theme/colors'
import Usage from '@/component/shared/usage'
import AppTextInput from '@/component/shared/input'
import Separator from '@/component/shared/auth/Separator'
import AppButton from '@/component/shared/button'
import { fontFamily, fontSize, fontWeight } from '@/theme/fonts'
import AlreadyHaveAccount from '@/component/shared/auth/AlreadyHaveAccount'
import { router } from 'expo-router'
import { typography } from '@/theme/typography'

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleContinue = () => {
      console.log('Email:', email);
      console.log('Password:', password);
    };
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <SafeAreaView style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
        <AuthHeader title='Sign In' showBack />
        <SocialAuth
          onGoogle={() => console.log("Google")}
          onApple={() => console.log("Apple")}
          onFacebook={() => console.log("Facebook")}
        />
        <Separator text="Or sign in with" />
        <View>
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
        <Pressable onPress={() => router.push('/(authentication)/forgotpassword')} style={{marginBottom: 10}}>
          <Text style={typography.caption}>Forgot Password?</Text>
        </Pressable>
          <AppButton
            title={"Log in"}
            onPress={() => router.replace('/(tabs)/home')}
            variant="primary"
          />
          <AlreadyHaveAccount
            onPress={() => router.push("/(authentication)/signup")}
            questionText="Dont't have an account?"
            actionText="Sign up"
          />
      </SafeAreaView>
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({})