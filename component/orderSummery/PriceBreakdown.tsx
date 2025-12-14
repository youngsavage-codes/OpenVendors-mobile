import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

type PaymentMethod = "now" | "venue";

interface PriceBreakdownProps {
  total: number; // subtotal
  bookingFee?: number;
  paymentMethod?: PaymentMethod;
  showPaymentSplit?: boolean;
}

export default function PriceBreakdown({
  total,
  bookingFee = 300,
  paymentMethod = "now",
  showPaymentSplit = true,
}: PriceBreakdownProps) {
  const grandTotal = total + bookingFee;

  return (
    <View style={styles.container}>
      {/* Subtotal */}
      <View style={styles.row}>
        <Text style={typography.label}>Subtotal</Text>
        <Text style={typography.caption}>
          NGN {total.toLocaleString()}
        </Text>
      </View>

      {/* Payment split */}
      {showPaymentSplit && (
        <View style={styles.paymentSection}>
          <View style={styles.row}>
            <Text
              style={[
                typography.label,
                paymentMethod === "now" && styles.primaryText,
              ]}
            >
              Booking fee
            </Text>
            <Text
              style={[
                typography.label,
                paymentMethod === "now" && styles.primaryText,
              ]}
            >
              NGN {bookingFee.toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={typography.title}>Total</Text>
        <Text style={typography.subtitle}>
          NGN {grandTotal.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.gray200,
    paddingVertical: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  paymentSection: {
    marginTop: 10,
  },

  primaryText: {
    color: colors.primary,
  },
});
