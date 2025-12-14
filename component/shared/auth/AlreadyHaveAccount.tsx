import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize, fontWeight } from "@/theme/fonts";
import { typography } from "@/theme/typography";

interface AlreadyHaveAccountProps {
  questionText?: string; // e.g. "Already have an account?"
  actionText?: string;   // e.g. "Sign In"
  onPress: () => void;
}

const AlreadyHaveAccount: React.FC<AlreadyHaveAccountProps> = ({
  questionText = "Already have an account?",
  actionText = "Sign In",
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={typography.label}>{questionText}</Text>
      <Pressable onPress={onPress}>
        <Text style={[typography.label, styles.action]}>{actionText}</Text>
      </Pressable>
    </View>
  );
};

export default AlreadyHaveAccount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 5,
  },
  question: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.gray400,
    fontWeight: fontWeight.light
  },
  action: {
    color: colors.primary,
  },
});
