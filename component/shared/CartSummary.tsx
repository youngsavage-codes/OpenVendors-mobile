import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily, fontWeight, fontSize } from '@/theme/fonts';
import SmallButton from './smallButton';
import { typography } from '@/theme/typography';
import { formatDurationCompact } from '@/utils/formarDuration';

interface CartSummaryProps {
  totalPrice: number;
  totalDuration: number; // in minutes
  totalItems: number;
  onContinue?: () => void;
  disabled?: boolean
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  totalDuration,
  totalItems,
  onContinue,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={typography.label}>NGN {totalPrice.toLocaleString()}</Text>
        <Text style={typography.description}>
          {totalItems} {totalItems > 1 ? 'Services' : 'Service'} {formatDurationCompact(totalDuration)}
        </Text>
      </View>
      <SmallButton disabled={disabled} title="Continue" onPress={onContinue} />
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  priceText: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    fontSize: fontSize.sm,
  },
});
