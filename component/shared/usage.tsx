import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AppTextInput from './input';
import AppButton from './button';

const Usage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      {/* Input fields */}
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

      {/* Buttons */}
      <AppButton
        title="Continue"
        variant="outline"
        onPress={handleContinue}
      />

      <AppButton
        title="Loading..."
        loading
        variant="secondary"
        onPress={() => {}}
      />
    </View>
  );
};

export default Usage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
});
