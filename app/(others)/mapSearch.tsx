// CategoryGrid.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { fontSize, fontWeight } from '@/theme/fonts';
import { router } from 'expo-router';
import CategoryCard from '@/component/shared/CategoryCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES } from '@/constant/data';
import { ArrowDown2, TickCircle } from 'iconsax-react-nativejs';

const CategoryGrid = () => {
  const renderItem = ({ item }: any) => (
    <CategoryCard title={item.title} image={item.image} onPress={() => {}} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <Pressable onPress={() => router.back()} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
      <View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8, alignItems: 'center'}}
          >
            {[
              { label: 'Best Match', icon: <ArrowDown2 size={15} color={colors.gray400} /> },
              { label: 'Price', icon: <ArrowDown2 size={15} color={colors.gray400} /> },
              { label: 'Options', icon: <ArrowDown2 size={15} color={colors.gray400} /> },
              { label: 'Only Verified', icon: <TickCircle size={15} color={colors.gray400} /> },
              { label: 'Type', icon: <ArrowDown2 size={15} color={colors.gray400} /> },
            ].map((filter, index) => (
              <Pressable key={index} style={styles.filterButton}>
                <Text style={typography.tiny}>{filter.label}</Text>
                <View style={{ marginLeft: 4 }}>{filter.icon}</View>
              </Pressable>
            ))}
          </ScrollView>
      </View>


      <Text style={typography.h3}>Categories</Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12}}
      />
    </SafeAreaView>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  closeText: {
    fontWeight: fontWeight.medium,
    fontSize: fontSize.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12, // spacing between rows
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: colors.gray400,
    borderRadius: 50,
    marginRight: 8,
  },

});
