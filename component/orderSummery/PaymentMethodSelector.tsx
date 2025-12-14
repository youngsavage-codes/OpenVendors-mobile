import { View, Text, Pressable, StyleSheet } from "react-native";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

export type PaymentMethod = "now" | "venue";

interface Props {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  amount: number;
}

export default function PaymentMethodSelector({
  value,
  onChange,
  amount,
}: Props) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={typography.h3}>Payment Method</Text>

      {(["now", "venue"] as PaymentMethod[]).map((method) => (
        <Pressable
          key={method}
          style={[
            styles.option,
            value === method && styles.active,
          ]}
          onPress={() => onChange(method)}
        >
          <View style={styles.radio}>
            {value === method && <View style={styles.radioInner} />}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={typography.label}>
              {method === "now" ? "Pay now" : "Pay at venue"}
            </Text>
            <Text style={typography.caption}>
              {method === "now"
                ? "Secure payment to confirm booking"
                : "Pay directly at the salon"}
            </Text>
          </View>

          <Text style={typography.caption}>
            NGN {amount.toLocaleString()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginTop: 12,
  },
  active: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
