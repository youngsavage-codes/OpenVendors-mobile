import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontFamily, fontSize } from "@/theme/fonts";
import AppButton from "@/component/shared/button";
import { colors } from "@/theme/colors";
import { router } from "expo-router";

import { images } from "@/constant/images";
import { typography } from "@/theme/typography";

export const onboardingSlides = [
  {
    image: images.hero1,
    title: "Discover Your Perfect Style",
    subtitle: "Book appointments with top hairstylists and salons near you effortlessly.",
  },
  {
    image: images.hero2,
    title: "Anytime, Anywhere",
    subtitle: "Schedule your haircuts, coloring, and treatments on the go.",
  },
  {
    image: images.hero3,
    title: "Look and Feel Amazing",
    subtitle: "Enjoy personalized services and transform your style with confidence.",
  },
];


const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // start fully visible

  const animateFade = async () => {
    // Fade OUT
    await Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Change slide
    if (index < onboardingSlides.length - 1) {
      setIndex(index + 1);
    } else {
      router.replace("/(authentication)/signin");
      return;
    }

    // Fade IN
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slide = onboardingSlides[index];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* FADING CONTENT ONLY */}
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ImageBackground source={slide.image} style={styles.image} />

          <View style={styles.bottomContainer}>
            <Text style={[typography.title, styles.title]}>{slide.title}</Text>
            <Text style={[styles.subtitle, typography.description]}>{slide.subtitle}</Text>
          </View>
        </Animated.View>

        {/* STATIC BUTTON (does NOT fade) */}
        <View style={styles.buttonWrapper}>
          <AppButton
            title={index === onboardingSlides.length - 1 ? "Get Started!" : "Next"}
            onPress={animateFade}
            variant="primary"
          />
        </View>

        {/* DOTS */}
        <View style={styles.dotsWrapper}>
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: index === i ? 20 : 8,
                  backgroundColor:
                    index === i ? colors.primary : colors.gray400,
                },
              ]}
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  bottomContainer: {
    padding: 30,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    fontFamily: fontFamily.light,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    alignSelf: "center",
    width: "80%",
  },
  dotsWrapper: {
    marginVertical: 20,
    flexDirection: "row",
    alignSelf: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 10,
  },
});
