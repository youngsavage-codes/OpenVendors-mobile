import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/component/shared/SearchInput";
import MyVendorCard from "@/component/home/myVendorCard";
import MyVendorCardSkeleton from "@/component/skeletons/MyVendorCardSkeleton";
import { colors } from "@/theme/colors";
import { myVendorData, vendors } from "@/constant/data";
import EmptyState from "@/component/shared/emptyState";
import { DirectNotification } from "iconsax-react-nativejs";
import { typography } from "@/theme/typography";
import { useFavoriteVendorStore } from "@/store/favoriteVendorStore";

const categories = [
  "All",
  "Haircut",
  "Salon",
  "Makeup",
  "Massage",
  "Manicure",
  "Pedicure",
  "Shave",
  "Spa",
];

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 50) / 2;

const MyVendors = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState('');
  const {favoriteVendorIds} = useFavoriteVendorStore();

  const favoriteVendors = vendors.filter(v =>
    favoriteVendorIds.includes(v.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // FILTER VENDORS
  const filteredVendors = favoriteVendors.filter((vendor) => {
    // 1️⃣ Category filter
    const categoryMatch =
      selectedCategory === 'All' ||
      vendor.categories.includes(selectedCategory);

    // 2️⃣ Search filter (name + location + category)
    const searchMatch =
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.location.toLowerCase().includes(search.toLowerCase()) ||
      vendor.categories.some(cat =>
        cat.toLowerCase().includes(search.toLowerCase())
      );

    return categoryMatch && searchMatch;
  });

  // ❗Empty state when loading finished and no results
  const showEmptyState = !loading && favoriteVendors.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput onChangeText={(e) => {
          setSearch(e)
        }} 
        value={search} 
      />

      <View>
        {/* Category Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryBadge,
                selectedCategory === category && styles.categoryBadgeSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  typography.caption,
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* EMPTY STATE */}
      {showEmptyState && (
        <View style={{ marginTop: 40, flex: 1 }}>
          <EmptyState
            title="No Vendor Added"
            message="You haven't added any vendor to your list yet"
            icon={<DirectNotification size={30} variant="Bulk" />} // you can add a custom icon here if you want
            onActionPress={() => console.log("Retry fetching vendors")}
            actionText="Retry"
          />
        </View>
      )}

      {/* Vendor List */}
      {!showEmptyState && (
        <FlatList
          data={loading ? Array.from({ length: 6 }) : filteredVendors}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10, flex: 1 }}
          renderItem={({ item }) => (
            <View style={{ width: ITEM_WIDTH }}>
              {loading ? (
                <MyVendorCardSkeleton />
              ) : (
                <MyVendorCard
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  services={item.categories}
                  rating={item.rating}
                  fee={item.price}
                  verified={item.verified}
                />
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  categoryScroll: {
    marginBottom: 15,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.gray200,
    marginRight: 10,
  },
  categoryBadgeSelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.gray400,
  },
  categoryTextSelected: {
    color: "#fff",
  },
});

export default MyVendors;
