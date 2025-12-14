import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeSlash } from 'iconsax-react-nativejs';
import { fontFamily, fontSize } from '@/theme/fonts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  secureTextEntry?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ label, secureTextEntry = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      {label && <Text style={[typography.label, styles.label]}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size="24" color="#9CA3AF" variant="Bold" />
            ) : (
              <EyeSlash size="24" color="#9CA3AF" variant="Bold" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    color: '#374151', // gray-700
    fontFamily: fontFamily.light,
    fontSize: fontSize.sm
  },
});
