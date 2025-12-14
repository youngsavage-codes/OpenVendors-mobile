import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowLeft, ArrowLeft2 } from 'iconsax-react-nativejs';
import { router } from 'expo-router';
import { fontFamily, fontSize, fontWeight } from '@/theme/fonts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface HeaderProp {
  title?: string;
  showBack?: boolean;
}

const AuthHeader: React.FC<HeaderProp> = ({ title, showBack }) => {
  return (
    <View style={styles.headerContainer}>
      
      {/* Left Section (Back Button or placeholder to keep center alignment) */}
      <View style={styles.sideContainer}>
        {showBack && (
          <Pressable 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <ArrowLeft size={22} />
          </Pressable>
        )}
      </View>

      {/* Center Title */}
      <View style={styles.centerContainer}>
        <Text style={typography.h3}>{title}</Text>
      </View>

      {/* Right placeholder to balance layout */}
      <View style={styles.sideContainer} />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sideContainer: {
    width: 40, // ensures symmetry for proper centering
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    borderColor: colors.gray200,
    borderWidth: 1,
    padding: 6,
    borderRadius: 50,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
