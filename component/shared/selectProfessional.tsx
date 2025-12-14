import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { TickCircle } from 'iconsax-react-nativejs';
import { fontFamily, fontSize } from '@/theme/fonts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface SelectProfessionalsProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  selected?: boolean;
  onPress: () => void;
}

const SelectProfessionals: React.FC<SelectProfessionalsProps> = ({
  title,
  subtitle,
  icon,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: selected ? colors.primary : colors.gray200 },
          ]}
        >
          {icon}
        </View>
        <View style={styles.textWrapper}>
          <Text style={typography.label}>{title}</Text>
          {subtitle && <Text style={typography.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {selected && (
        <View style={styles.tickWrapper}>
          <TickCircle size={30} color={colors.primary} variant="Bulk" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SelectProfessionals;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginVertical: 5,
    backgroundColor: colors.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flexDirection: 'column',
  },
  title: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    fontFamily: fontFamily.bold,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.gray400,
    fontFamily: fontFamily.medium,
    marginTop: 2,
  },
  tickWrapper: {
    marginLeft: 10,
  },
});
