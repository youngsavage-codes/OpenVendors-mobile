import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface CategoryCardProps {
  title: string;
  image: any;
  onPress?: () => void;
}

const CategoryCard = ({ title, image, onPress }: CategoryCardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </Pressable>
  );
};

export default CategoryCard;

const CARD_WIDTH = '48%'; // slightly less than 50% to allow spacing

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray100,
    borderWidth: 0.5,
    borderColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  title: {
    ...typography.caption,
    flexShrink: 1,
    marginRight: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
});
