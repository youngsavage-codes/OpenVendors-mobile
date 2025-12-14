import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";
import Badge from "@/component/shared/Badge";
import { Star1, TickCircle, Heart } from "iconsax-react-nativejs";
import { typography } from "@/theme/typography";
import { useFavoriteVendorStore } from "@/store/favoriteVendorStore";
import { router } from "expo-router";

interface VendorCardProps {
  id?: number
  image: any;
  name: string;
  services: string[];
  rating: number;
  fee?: string | number;
  verified?: boolean;
}

const MyVendorCard: React.FC<VendorCardProps> = ({
  id,
  image,
  name,
  services,
  rating,
  fee,
  verified = false,
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
    <ImageBackground
      source={image}
      style={styles.vendorCard}
      imageStyle={{ borderRadius: 12 }}
    >
      <Pressable onPress={handlePress} style={styles.overlay}>
        {/* Verified Badge */}
        {verified && (
          <View style={styles.verifiedBadge}>
            <TickCircle size={14} color="#fff" variant="Bold" />
          </View>
        )}

        {/* Heart Like */}
        <TouchableOpacity
          style={[
            styles.heartBadge,
            { backgroundColor: favorited ? colors.danger : "rgba(0,0,0,0.3)" },
          ]}
          onPress={() => toggleFavorite(id)}
        >
          <Heart
            size={16}
            color="#fff"
            variant={"Bold"}
          />
        </TouchableOpacity>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <Text style={[typography.label, {marginBottom: 5, color: colors.textLight}]}>{name}</Text>

          <View style={styles.badgeContainer}>
            {services.map((service, idx) => (
              <Badge key={idx} text={service} />
            ))}
          </View>
        </View>

        {/* Rating + Price Row */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Star1 size={14} color="#FFD700" variant="Bold" />
            <Text style={[typography.tiny, styles.ratingText]}>{rating.toFixed(1)}</Text>
          </View>

          {fee && (
            <View style={styles.feeBadge}>
              <Text style={[typography.tiny, styles.feeBadgeText]}>₦ {fee}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  vendorCard: {
    flex: 1,
    height: 220,
    justifyContent: "flex-end",
    position: "relative",
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    borderRadius: 12,
    justifyContent: "flex-end",
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
  heartBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 20,
    zIndex: 2,
  },
  bottomInfo: {
    marginBottom: 28,
  },
  vendorName: {
    color: "#fff",
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between", // space between rating and fee
    alignItems: "center",
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    color: "#fff",
  },
  feeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  feeBadgeText: {
    color: "#fff",
  },
});

export default MyVendorCard;
