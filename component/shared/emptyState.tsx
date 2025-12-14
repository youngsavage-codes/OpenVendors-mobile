import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";
import { Icon } from "iconsax-react-nativejs";
import { typography } from "@/theme/typography";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode; // Optional custom icon
  onActionPress?: () => void;
  actionText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Found",
  message = "Please check again later.",
  icon,
  onActionPress,
  actionText = "Retry",
}) => {
  return (
    <View style={styles.container}>
      {/* ICON WRAPPER */}
      <View style={styles.iconWrapper}>
        {icon ? (
          icon
        ) : (
          <Icon name="Inbox" size={36} color={colors.gray500} variant="Bulk" />
        )}
      </View>

      {/* TITLE */}
      <Text style={[typography.h3, styles.title]}>{title}</Text>

      {/* MESSAGE */}
      <Text style={[typography.subtitle, styles.message]}>{message}</Text>

      {/* ACTION BUTTON */}
      {onActionPress && (
        <Pressable style={styles.button} onPress={onActionPress}>
          <Text style={[typography.caption, { color: colors.background }]}>
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },

  iconWrapper: {
    backgroundColor: colors.gray100,
    padding: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    textAlign: "center",
    marginBottom: 6,
  },

  message: {
    textAlign: "center",
    color: colors.gray600,
  },

  button: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
});

export default EmptyState;
