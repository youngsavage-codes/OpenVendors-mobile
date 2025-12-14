import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";
import { Star1, CalendarEdit, Location, Heart, ShieldTick, TickCircle } from "iconsax-react-nativejs";
import { router } from "expo-router";
import { typography } from "@/theme/typography";
import { useFavoriteVendorStore } from "@/store/favoriteVendorStore";

interface VendorCardProps {
  id: number;
  imageUrl: any;
  vendorName: string;
  location: string;
  status: "Open" | "Closed";
  price?: number; // price in Naira
  rating?: number; // 0-5
  imageStack: any[];
  isVerified?: boolean; // new prop for verified badge
}

const VendorCard: React.FC<VendorCardProps> = ({
  id,
  imageUrl,
  vendorName,
  location,
  status,
  price = 0,
  rating = 5,
  imageStack,
  isVerified = false,
}) => {

  const handlePress = () => {
    router.push({
      pathname: '/(others)/vendorProfile',
      params: { vendorId: id }, // Pass as params, not query string
    });
  };

  const { toggleFavorite, isFavorite } = useFavoriteVendorStore();
  const favorited = isFavorite(id);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      {/* Vendor Image with Status, Rating */}
      <ImageBackground
        source={imageUrl}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 12 }}
      >
        {/* Verified Badge */}
        {isVerified && (
          <View style={styles.verifiedBadge}>
            <TickCircle size={14} color="#fff" variant="Bold" />
          </View>
        )}

        {/* Heart icon badge */}
        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: favorited ? "#FF5A5F" : "rgba(0,0,0,0.3)" }]}
          onPress={() => toggleFavorite(id)}
        >
          <Heart  size={16} color="#fff" variant={"Bold" } />
        </TouchableOpacity>

        {/* Rating overlay at bottom left */}
        <View style={styles.ratingOverlay}>
          <Star1 size={14} color="#FFD700" variant="Bold" />
          <Text style={[typography.tiny, {color: colors.background}]}>{rating.toFixed(1)}</Text>
        </View>
      </ImageBackground>

      {/* Vendor Name */}
      <Text style={[typography.label, {marginTop: 5}]}>{vendorName}</Text>

      {/* Location */}
      <View style={styles.locationRow}>
        <Location size={13} color={colors.gray400} variant="Bold" />
        <Text style={typography.caption}>{location}</Text>
      </View>

      {/* Image Stack + Booked Count */}
      <View style={styles.bottomRow}>
        <View style={styles.imageStackContainer}>
          {imageStack.map((img, index) => (
            <Image
              key={index}
              source={img}
              style={[styles.stackImage, { left: index * -10 }]}
            />
          ))}
        </View>
        <Text style={typography.tiny}>+10 has booked</Text>
      </View>

      {/* Price and Book Button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[typography.tiny, styles.priceText]}>₦{price.toLocaleString()}</Text>

        <Pressable style={styles.bookButton}>
          <CalendarEdit size={16} color="#fff" variant="Bold" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray100,
    borderRadius: 12,
    overflow: "hidden",
    padding: 10,
    marginBottom: 15,
    width: 200,
  },
  imageBackground: {
    height: 120,
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 8,
  },
  verifiedBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#4CAF50",
    padding: 4,
    borderRadius: 12,
    zIndex: 2,
  },
  statusBadge: {
    padding: 6,
    borderRadius: 20,
  },
  ratingOverlay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    position: "absolute",
    bottom: 8,
    left: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  bottomRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  imageStackContainer: {
    flexDirection: "row",
    position: "relative",
    width: 50
  },
  stackImage: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
    position: "relative",
  },
  priceText: {
    marginTop: 6,
    fontFamily: fontFamily.medium,
  },
  bookButton: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
});

export default VendorCard;
