import { StyleSheet } from "react-native";
import { fontFamily, fontSize } from "./fonts";
import { colors } from "./colors";

export const typography = StyleSheet.create({
  // Headers
  h1: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  // Titles
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.gray400,
  },

  // Body text
  body: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  bodyMedium: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  bodyBold: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  // Description
  description: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // Tiny text
  tiny: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // Caption
  caption: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.gray400,
  },

  // Button text
  button: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.bold,
    color: colors.background,
  },

  // Labels (form labels)
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
});
