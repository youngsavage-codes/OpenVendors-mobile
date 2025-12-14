import { View, Text, StyleSheet } from "react-native";
import { typography } from "@/theme/typography";

interface Item {
  name: string;
  duration: string;
  price: number;
}

export default function OrderItemsList({ items }: { items: Item[] }) {
  return (
    <View style={styles.container}>
      <Text style={typography.h3}>Services</Text>

      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          <View>
            <Text style={typography.label}>{item.name}</Text>
            <Text style={typography.caption}>{item.duration}</Text>
          </View>

          <Text style={typography.caption}>
            {item.price.toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
