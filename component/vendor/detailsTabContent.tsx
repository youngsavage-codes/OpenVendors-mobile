import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Star1 } from "iconsax-react-nativejs";

const DetailsTabContent = ({ vendor }) => {
  if (!vendor) return null;

  // Render stars dynamically based on vendor.rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(vendor.rating);
    const halfStar = vendor.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star1 key={`star-${i}`} size={15} variant="Bold" color="#FFD700" />);
    }

    if (halfStar) {
      stars.push(<Star1 key="star-half" size={15} variant="Bold" color="#FFD700" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star1 key={`star-empty-${i}`} size={15} variant="Outline" color="#FFD700" />);
    }

    return stars;
  };

  // Map abbreviations to full day names
  const dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  // Format opening days
  const formatOpeningDays = (days = []) => {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const satIncluded = days.includes("Sat");
    const sunIncluded = days.includes("Sun");
    const allWeekdaysIncluded = weekdays.every((d) => days.includes(d));

    let result = "";
    if (allWeekdaysIncluded && !satIncluded && !sunIncluded) result = "Monday to Friday";
    else if (allWeekdaysIncluded && satIncluded && !sunIncluded) result = "Monday to Saturday";
    else if (allWeekdaysIncluded && satIncluded && sunIncluded) result = "Every day";
    else result = days.map((d) => dayMap[d] || d).join(", ");

    return result;
  };

  return (
    <View style={styles.container}>
      {/* Vendor Name */}
      <Text style={typography.h3}>{vendor.name}</Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={typography.caption}>{vendor.rating.toFixed(1)}</Text>
        <View style={styles.starsRow}>{renderStars()}</View>
        <Text style={[typography.caption, styles.reviewCount]}>
          ({vendor.reviews?.length ?? 0})
        </Text>
      </View>

      {/* Distance & Location */}
      <View style={styles.locationRow}>
        <Text style={[typography.caption, styles.locationText]}>
          {vendor.distance ?? "14.5 km"}
        </Text>
        <View style={styles.dot} />
        <Text style={[typography.caption, styles.locationText]}>{vendor.location}</Text>
      </View>

      {/* Opening Hours */}
      <Text style={typography.caption}>
        Open {formatOpeningDays(vendor.openingDays)} from {vendor.openingTime} to {vendor.closingTime}
      </Text>
    </View>
  );
};

export default DetailsTabContent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginHorizontal: 4,
  },
  reviewCount: {
    color: colors.primary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  locationText: {
    color: colors.gray600,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gray400,
  },
});
