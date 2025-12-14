import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Google, Apple, Facebook } from "iconsax-react-nativejs";
import { fontFamily, fontSize } from "@/theme/fonts";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

interface SocialAuthProps {
  onGoogle?: () => void;
  onApple?: () => void;
  onFacebook?: () => void;
}

const SocialAuth: React.FC<SocialAuthProps> = ({
  onGoogle,
  onApple,
  onFacebook,
}) => {
  return (
    <View style={styles.container}>
      {/* Google */}
      <Pressable style={styles.button} onPress={onGoogle}>
        <Google size={20} variant="Bulk" color={colors.primary} />
        <Text style={typography.subtitle}>Continue with Google</Text>
      </Pressable>

      {/* Apple */}
      <Pressable style={styles.button} onPress={onApple}>
        <Apple size={24} variant="Bulk" color={colors.primary} />
        <Text style={typography.subtitle}>Continue with Apple</Text>
      </Pressable>

      {/* Facebook */}
      <Pressable style={styles.button} onPress={onFacebook}>
        <Facebook size={25} variant="Bulk" color={colors.primary} />
        <Text style={typography.subtitle}>Continue with Facebook</Text>
      </Pressable>
    </View>
  );
};

export default SocialAuth;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.gray100,
    paddingVertical: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  btnText: {
    fontFamily: fontFamily.light,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
