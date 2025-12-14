import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize, fontWeight } from "@/theme/fonts";
import { typography } from "@/theme/typography";

interface PageTitleProps {
  title: string;
  showViewAll?: boolean;
  onViewAllPress?: () => void;
  style?: any;
}

export default function PageTitle({
  title,
  showViewAll = false,
  onViewAllPress,
  style,
}: PageTitleProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[typography.title, styles.text]}>{title}</Text>

      {showViewAll && (
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={[typography.label, styles.viewAll]}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },

  text: {
    color: colors.textPrimary,
  },

  viewAll: {
    color: colors.primary,
  },
});
