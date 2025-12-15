import { View, Text, StyleSheet } from "react-native";
import { CalendarSearch, Clock } from "iconsax-react-nativejs";
import { typography } from "@/theme/typography";

interface Props {
  date: string;
  time: string;
}

export default function BookingDateTime({ date, time }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CalendarSearch size={18} variant="Bulk" />
        <Text style={typography.description}>{date}</Text>
      </View>

      <View style={styles.row}>
        <Clock size={18} variant="Bulk" />
        <Text style={typography.description}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
});
