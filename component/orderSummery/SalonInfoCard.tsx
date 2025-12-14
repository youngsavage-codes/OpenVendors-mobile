import { View, Text, Image, StyleSheet } from "react-native";
import { Star1 } from "iconsax-react-nativejs";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

interface Props {
  image: any;
  name: string;
  rating: string;
  reviews: string;
  address: string;
}

export default function SalonInfoCard({
  image,
  name,
  rating,
  reviews,
  address,
}: Props) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={typography.label}>{name}</Text>

        <View style={styles.ratingRow}>
          <Text style={typography.tiny}>{rating}</Text>
          <Star1 size={14} variant="Bulk" color={colors.primary} />
          <Text style={typography.tiny}>({reviews})</Text>
        </View>

        <Text style={typography.caption}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 2,
  },
});
