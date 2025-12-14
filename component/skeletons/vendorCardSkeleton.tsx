import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "@/theme/colors";

const VendorCardSkeleton = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 250], // move across the card
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageSkeleton}>
        {/* Shimmer overlay */}
        <Animated.View
          style={[
            styles.shimmerOverlay,
            { transform: [{ translateX: shimmerTranslate }] },
          ]}
        />
      </View>

      <View style={styles.lineSkeleton} />
      <View style={[styles.lineSkeleton, { width: "50%", marginTop: 6 }]} />

      <View style={styles.bottomRow}>
        <View style={styles.imageStackContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View
              key={index}
              style={[styles.stackImageSkeleton, { left: index * -10 }]}
            />
          ))}
        </View>

        <View style={[styles.lineSkeleton, { width: 60, height: 10 }]} />
      </View>

      <View style={styles.bottomRow2}>
        <View style={[styles.lineSkeleton, { width: 60, height: 14 }]} />
        <View style={styles.buttonSkeleton} />
      </View>

      {/* Global shimmer across card */}
      <Animated.View
        style={[
          styles.shimmerOverlayCard,
          { transform: [{ translateX: shimmerTranslate }] },
        ]}
      />
    </View>
  );
};

export default VendorCardSkeleton;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray100,
    borderRadius: 12,
    overflow: "hidden",
    padding: 10,
    marginBottom: 15,
    width: 200,
    position: "relative",
  },

  imageSkeleton: {
    height: 120,
    backgroundColor: colors.gray200,
    borderRadius: 12,
    overflow: "hidden",
  },

  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 80,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 12,
  },

  shimmerOverlayCard: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: 80,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
  },

  lineSkeleton: {
    marginTop: 8,
    width: "80%",
    height: 14,
    backgroundColor: colors.gray200,
    borderRadius: 6,
  },

  bottomRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  imageStackContainer: {
    flexDirection: "row",
    position: "relative",
    width: 50,
    height: 20,
  },

  stackImageSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: colors.gray200,
    position: "absolute",
  },

  bottomRow2: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonSkeleton: {
    width: 40,
    height: 20,
    backgroundColor: colors.gray200,
    borderRadius: 20,
  },
});
