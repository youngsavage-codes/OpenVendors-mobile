import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/component/home/Header";
import IconButton from "@/component/shared/IconButton";
import Carousel from "@/component/home/carousel";

import {
  Harmony,
  Photoshop,
  Brush2,
  SearchNormal1,
  Setting2,
  Setting4,
} from "iconsax-react-nativejs";

import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";
import { images } from "@/constant/images";
import VendorCard from "@/component/home/VendorCard";
import { cards, CATEGORIES, vendorData } from "@/constant/data";
import NearbyVendor from "@/component/home/nearbyVendor";
import TopVendors from "@/component/home/topVendors";
import CarouselSkeleton from "@/component/skeletons/CarouselSkeleton";
import { typography } from "@/theme/typography";
import CategoryCard from "@/component/shared/CategoryCard";
import PageTitle from "@/component/shared/PageTitle";
import CategoriesSection from "@/component/shared/categorySection";

const Index = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
    // NEW: carousel loading state
  const [carouselLoading, setCarouselLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCarouselLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
  <View style={styles.container}>
    <SafeAreaView>
      {/* Header stays fixed */}
      <Header />

      {/* Wrap everything below header in a ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        nestedScrollEnabled={true} 
        scrollEnabled={scrollEnabled}
      >
        <Text style={[typography.h3, styles.heading]}>
          <Text style={{ color: colors.gray600 }}>Hello</Text>, Savage!
        </Text>

        {/* SEARCH + ICONS */}
        <View style={styles.row}>
          <View style={styles.searchContainer}>
            <SearchNormal1
              variant='Bulk'
              size={18}
              color={colors.gray600}
              style={{ marginRight: 8 }}
            />

            <TextInput
              placeholder="Search..."
              placeholderTextColor={colors.gray400}
              style={styles.searchInput}
            />
          </View>

          <View style={styles.rightSection}>
            <IconButton>
              <Setting4 variant='Bulk' size={22} color={colors.textPrimary} />
            </IconButton>

            <IconButton>
              <Setting2 variant='Bulk' size={22} color={colors.textPrimary} />
            </IconButton>
          </View>
        </View>

        {/* CAROUSEL */}
          {carouselLoading ? (
            <CarouselSkeleton />
          ) : (
            <Carousel data={cards} setScrollEnabled={setScrollEnabled} />
          )}

          <CategoriesSection />

          {/* TOP VENDORS HEADING */}
          <TopVendors />


          <NearbyVendor />

      </ScrollView>
    </SafeAreaView>
  </View>
);

};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  heading: {
    marginTop: 16,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray200,
  },

    columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12, // spacing between rows
  },

  searchInput: {
    flex: 1,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    fontFamily: fontFamily.light,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sectionHeading: {
    marginTop: 20,
    marginBottom: 10,
  },
});
