import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "@/theme/colors";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 60) / 2;

const MyVendorCardSkeleton = () => {
  return (
    <View style={styles.vendorCardContainer}>
      <View style={styles.vendorCard}>
        {/* Top badges skeleton */}
        <View style={styles.topSkeleton}>
          <View style={styles.badgeSkeleton} />
          <View style={styles.heartSkeleton} />
        </View>

        {/* Bottom info skeleton */}
        <View style={styles.bottomSkeleton}>
          <View style={styles.nameSkeleton} />
          <View style={styles.badgesRow}>
            <View style={styles.smallBadge} />
            <View style={styles.smallBadge} />
          </View>
        </View>

        {/* Rating skeleton */}
        <View style={styles.ratingSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vendorCardContainer: {
    width: ITEM_WIDTH,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.gray200,
  },
  vendorCard: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
    justifyContent: "flex-end",
    position: "relative",
    backgroundColor: colors.gray100,
  },
  topSkeleton: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badgeSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gray200,
  },
  heartSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gray200,
  },
  bottomSkeleton: {
    marginBottom: 28,
  },
  nameSkeleton: {
    width: "70%",
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.gray200,
    marginBottom: 6,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 4,
  },
  smallBadge: {
    width: 40,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.gray200,
  },
  ratingSkeleton: {
    position: "absolute",
    bottom: 8,
    left: 8,
    width: 40,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.gray200,
  },
});

export default MyVendorCardSkeleton;
