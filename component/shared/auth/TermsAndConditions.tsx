import React, { useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Checkbox } from "react-native-paper";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize, fontWeight } from "@/theme/fonts";
import { typography } from "@/theme/typography";

interface TermsProps {
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const TermsAndConditions: React.FC<TermsProps> = ({
  onTermsPress = () => Linking.openURL("https://example.com/terms"),
  onPrivacyPress = () => Linking.openURL("https://example.com/privacy"),
  checked = false,
  onCheckChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onCheckChange?.(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Checkbox
          status={isChecked ? "checked" : "unchecked"}
          onPress={handleToggle}
          color={colors.primary}
        />
        <Text style={typography.caption}>
          I accept and agree to comply with{" "}
          <Text style={[typography.caption, styles.link]} onPress={onTermsPress}>
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text style={[typography.caption, styles.link]} onPress={onPrivacyPress}>
            Privacy Policy
          </Text>.
        </Text>
      </View>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  link: {
    color: colors.primary,
  },
});
