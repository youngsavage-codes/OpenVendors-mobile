import { colors } from "@/theme/colors";
import { fontFamily, fontSize, fontWeight } from "@/theme/fonts";
import { typography } from "@/theme/typography";
import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const { height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

export interface CarouselItem {
  title: string;
  description: string;
  imageUrl: any; // require(...)
  discount?: string; // e.g. "50% OFF"
}

export default function Carousel({ data = [] as CarouselItem[], setScrollEnabled }: { data: CarouselItem[], setScrollEnabled?: (enabled: boolean) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        // Immediately disable the ScrollView once user starts dragging
        if (Math.abs(gesture.dy) > 10) {
          setScrollEnabled && setScrollEnabled(false); // Disable parent scroll
          return true;
        }
        return false;
      },

      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: 0, y: gesture.dy });
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -SWIPE_THRESHOLD) swipeCard("up");
        else if (gesture.dy > SWIPE_THRESHOLD) swipeCard("down");
        else resetCard();

        // Re-enable parent scroll once the gesture ends
        setScrollEnabled && setScrollEnabled(true);
      },
    })
  ).current;

  const swipeCard = (direction: "up" | "down") => {
    Animated.timing(pan, {
      toValue: { x: 0, y: direction === "up" ? -height : height },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });

      setCurrentIndex((prev) => {
        if (direction === "up") {
          return (prev + 1) % data.length;
        } else {
          return (prev - 1 + data.length) % data.length;
        }
      });
    });
  };

  const resetCard = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const getVisibleData = () => {
    const rotated = [...data];
    return rotated.slice(currentIndex).concat(rotated.slice(0, currentIndex));
  };

  const renderCards = () =>
    getVisibleData()
      .map((item, index) => {
        const isTop = index === 0;
        const stackIndex = index;

        return (
          <Animated.View
            key={index}
            {...(isTop ? panResponder.panHandlers : {})}
            style={[
              styles.card,
              isTop && styles.topCard,
              !isTop && {
                top: 12 * stackIndex,
                opacity: 1 - stackIndex * 0.22,
                transform: [{ scale: 1 - stackIndex * 0.05 }],
              },
              isTop && { transform: pan.getTranslateTransform() },
            ]}
          >
            <ImageBackground
              source={item.imageUrl}
              style={styles.cardBackground}
              resizeMode="cover"
            >
              {/* Overlay */}
              <View style={styles.overlay}>
                {/* Badges */}
                {item.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={[typography.tiny, styles.badgeText]}>{item.discount}</Text>
                  </View>
                )}

                {/* Text */}
                <Text style={[typography.title, styles.cardTitle]}>{item.title}</Text>
                <Text style={[typography.subtitle, styles.cardDescription]} numberOfLines={1}>{item.description}</Text>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={[typography.label ,styles.buttonText]}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </Animated.View>
        );
      })
      .reverse();

  return <View style={styles.container}>{renderCards()}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  card: {
    width: "100%",
    height: "90%",
    borderRadius: 18,
    backgroundColor: "#fff",
    position: "absolute",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  topCard: {
    zIndex: 100,
  },

  cardBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    backgroundColor: colors.overlay
  },

  discountBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#FF5A5F",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    zIndex: 10,
  },

  badgeText: {
    color: "#fff",
  },

  cardTitle: {
    color: colors.textLight,
    marginBottom: 5,
  },

  cardDescription: {
    color: "#fff",
    lineHeight: 20,
    marginBottom: 15,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'flex-end',
  },

  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },

  buttonText: {
    color: "#fff",
  },
});
