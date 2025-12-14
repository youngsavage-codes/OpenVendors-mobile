import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';
import { typography } from '@/theme/typography';

interface SmallButtonProps {
  title: string;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean
}

const SmallButton: React.FC<SmallButtonProps> = ({ title, onPress, style, textStyle, disabled = false }) => {
  return (
    <Pressable style={[styles.bookButton, style]} onPress={onPress} disabled={disabled}>
      <Text style={[typography.caption ,styles.bookButtonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  bookButton: {
    paddingVertical: 10,        // added vertical padding
    paddingHorizontal: 20,      // added horizontal padding
    borderRadius: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    textAlign: 'center',        // ensures horizontal centering
    color: colors.textLight
  },
});

