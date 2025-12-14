import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';
import { router } from 'expo-router';
import { typography } from '@/theme/typography';

const Index = () => {
  const word = 'Open Vendor';
  const letters = word.split('');

  const anims = useMemo(() => letters.map(() => new Animated.Value(0)), []);

  const waveColors = [
    '#00aaff', '#ff004c', '#9d00ff', '#00ff7f', '#ffd700', '#ff6ec7', '#1e90ff',
  ];

  useEffect(() => {
    const delayPerLetter = 200;
    const flashDuration = 400;
    const returnDuration = 400;

    const sequences = anims.map((anim, index) =>
      Animated.sequence([
        Animated.delay(index * delayPerLetter),
        Animated.timing(anim, {
          toValue: 1,
          duration: flashDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: returnDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    Animated.stagger(0, sequences).start();

    const lastLetterIndex = letters.length - 1;
    const totalDuration = lastLetterIndex * delayPerLetter + flashDuration + returnDuration;

    const timer = setTimeout(() => {
      router.replace('/(authentication)/onboarding'); // navigate after last letter
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  const getColor = (anim: Animated.Value, index: number) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.textPrimary, waveColors[index % waveColors.length]], // text starts black
    });

  return (
    <View style={styles.container}>
      <View style={styles.overLay}>
        <View style={styles.row}>
          {letters.map((letter, i) => (
            <Animated.Text
              key={i}
              style={[typography.h1, { color: getColor(anims[i], i) }]}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  overLay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
