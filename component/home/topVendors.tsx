import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import VendorCard from "./VendorCard";
import { vendorData, vendors } from "@/constant/data";
import PageTitle from "../shared/PageTitle";
import VendorCardSkeleton from "../skeletons/vendorCardSkeleton";
import EmptyState from "../shared/emptyState";
import { DirectNotification } from "iconsax-react-nativejs";

const TopVendors = () => {
  const [loading, setLoading] = useState(true);

  const hasVendors = vendors && vendors.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // delay for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PageTitle
        title="Top Vendors"
        showViewAll={true}
        onViewAllPress={() => console.log("Top Vendors View All")}
      />

      {loading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <VendorCardSkeleton key={index} />
          ))}
        </ScrollView>
      ) : hasVendors ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {vendors.map((item, index) => (
            <VendorCard
              key={index}
              id={item.id}
              imageUrl={item.imageUrl}
              vendorName={item.vendorName}
              location={item.location}
              status={item.status as any}
              price={item.price as any}
              imageStack={item.imageStack}
              isVerified={item.isVerified}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          title="No Top Vendors"
          message="We couldn't find any top vendors at the moment."
          icon={<DirectNotification size={30} variant="Bulk" />}
          onActionPress={() => console.log("Retry fetching top vendors")}
          actionText="Retry"
        />
      )}
    </View>
  );
};

export default TopVendors;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 8,
    gap: 12,
    paddingRight: 0,
  },
});
