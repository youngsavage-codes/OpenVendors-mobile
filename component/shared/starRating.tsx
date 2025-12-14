import { colors } from "@/theme/colors";
import { Star1 } from "iconsax-react-nativejs";
import { View, StyleSheet } from "react-native";

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  const totalStars = 5;

  return (
    <View style={styles.ratingRow}>
      {Array.from({ length: totalStars }).map((_, index) => (
        <Star1
          key={index}
          size={size}
          variant={index < rating ? 'Bold' : 'Outline'}
          color={colors.warning}
        />
      ))}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // spacing between stars
  },
});
