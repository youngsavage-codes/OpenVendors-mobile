import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "@/theme/colors";

export default function CarouselSkeleton() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 300], // slide through the card
  });

  // Render stacked skeleton cards
  const skeletonCards = [0, 1, 2];

  return (
    <View style={styles.container}>
      {skeletonCards.map((_, index) => (
        <View
          key={index}
          style={[
            styles.card,
            {
              top: index * 12,
              opacity: 1 - index * 0.22,
              transform: [{ scale: 1 - index * 0.05 }],
              zIndex: skeletonCards.length - index,
            },
          ]}
        >
          {/* Shimmer layer */}
          <Animated.View
            style={[
              styles.shimmer,
              { transform: [{ translateX }] },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: "relative",
  },

  card: {
    width: "100%",
    height: "90%",
    backgroundColor: colors.gray200,
    borderRadius: 18,
    position: "absolute",
    overflow: "hidden",
  },

  shimmer: {
    position: "absolute",
    width: 100,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 18,
  },
});
