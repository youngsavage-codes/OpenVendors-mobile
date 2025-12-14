import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";
import { typography } from "@/theme/typography";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle;
}

const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  variant = "primary",
  style,
}) => {
  const backgroundColors = {
    primary: colors.primary,
    secondary: colors.secondary,
    outline: "transparent",
  };

  const textColors = {
    primary: colors.textLight,
    secondary: colors.textPrimary,
    outline: colors.primary,
  };

  const borderStyles =
    variant === "outline"
      ? { borderWidth: 1, borderColor: colors.primary }
      : {};

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: backgroundColors[variant],
          width: fullWidth ? "100%" : undefined,
          opacity: pressed ? 0.85 : disabled ? 0.5 : 1,
          ...borderStyles,
        },
        style,
      ]}
      android_ripple={{ color: colors.primary + "33" }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? colors.primary : colors.background}
        />
      ) : (
        <Text
          style={[
            typography.label,
            {
              color: textColors[variant],
            },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
