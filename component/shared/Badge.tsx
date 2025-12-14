import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontFamily, fontSize } from "@/theme/fonts";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

interface BadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  backgroundColor = "rgba(128,128,128,0.5)",
  textColor = "#fff",
  style,
}) => {
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <Text style={[typography.caption, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
  },
});
