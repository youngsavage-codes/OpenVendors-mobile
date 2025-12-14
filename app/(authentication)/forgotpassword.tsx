import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/component/shared/auth/authHeader'
import { colors } from '@/theme/colors'
import AppTextInput from '@/component/shared/input'
import AppButton from '@/component/shared/button'
import AppModal from '@/component/shared/modal'
import { fontFamily, fontSize } from '@/theme/fonts'
import { DeviceMessage } from 'iconsax-react-nativejs'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
        <SafeAreaView style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
                <AuthHeader title='Forgot Password' showBack />
                <View style={{marginTop: 20}}>
                    <AppTextInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <AppButton
                    title={"Submit"}
                    onPress={() => setModalVisible(true)}
                    variant="primary"
                />
                <AppModal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
                    <View style={{alignItems: 'center', justifyContent: 'center', padding: 15, backgroundColor: colors.gray200, borderRadius: 50}}>
                        <DeviceMessage size={30} variant='Bulk' color={colors.primary} />
                    </View>
                    <Text style={{ fontSize: fontSize.sm, textAlign: "center", fontFamily: fontFamily.medium, marginTop: 5 }}>Check Your Email</Text>
                    <Text style={{ fontSize: fontSize.xs, textAlign: "center", fontFamily: fontFamily.light, marginVertical: 10}}>
                        We have sent a password reset link to your email, it's valid for 24 hrs
                    </Text>
                    <AppButton
                        title={"Check Email"}
                        onPress={() => {}}
                        variant="primary"
                    />
                </AppModal>

        </SafeAreaView>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})