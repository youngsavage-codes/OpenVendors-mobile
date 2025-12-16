import React from "react";
import { View, FlatList, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { CATEGORIES } from "@/constant/data";
import CategoryCard from "@/component/shared/CategoryCard";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

const CategoriesSection = () => {
  // show only first 3 categories
  const categoriesToShow = CATEGORIES.slice(0, 6);

  const renderItem = ({ item }: any) => (
    <CategoryCard
      title={item.title}
      image={item.image}
      onPress={() => {}
      }
    />
  );

  return (
    <View style={styles.container}>
      {/* Header with View All button */}
      <View style={styles.header}>
        <Text style={typography.h3}>Categories</Text>
        <Pressable
          onPress={() => {}}
        >
          <Text style={[typography.label, { color: colors.primary }]}>
            View All
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={categoriesToShow}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false} // scroll handled by parent ScrollView
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      />
    </View>
  );
};

export default CategoriesSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
