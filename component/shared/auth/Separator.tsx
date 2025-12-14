import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";
import { typography } from "@/theme/typography";

interface SeparatorProps {
  text?: string; // dynamic center text
}

const Separator: React.FC<SeparatorProps> = ({ text = "OR" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={typography.caption}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default Separator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
});
