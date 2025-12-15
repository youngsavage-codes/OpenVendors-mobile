import React, { useMemo, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { Star1 } from 'iconsax-react-nativejs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

interface VendorSheetProps {
  vendors: any[];
  sheetRef: React.RefObject<BottomSheet>;
}

const VendorBottomSheet = ({ vendors, sheetRef }: VendorSheetProps) => {
  const snapPoints = useMemo(() => ['5%', '50%', '80%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('Sheet changed to:', index);
  }, []);

  const renderVendor = ({ item }: { item: any }) => {
    const services = item.services?.flatMap((s: any) => s.items) || [];
    const firstServices = services.slice(0, 2);
    const remainingCount = services.length - firstServices.length;

    return (
        <Pressable
            style={styles.vendorCard}
          onPress={() =>
            router.push({
              pathname: '/(others)/vendorProfile',
              params: { vendorId: item.id },
            })
          }
        >
          <Image source={item.image} style={styles.image} />

          <View style={styles.vendorInfo}>
            <View style={styles.header}>
              <Text style={typography.title}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Star1 variant="Bold" size={15} color="#FFD700" />
                <Text style={typography.tiny}>
                  {item.rating} ({item.reviews?.length || 0})
                </Text>
              </View>
            </View>

            <Text style={typography.caption}>{item.location}</Text>

            <View style={styles.servicesContainer}>
              {firstServices.map((service: any) => (
                <View key={service.serviceId} style={styles.serviceCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.subtitle}>{service.name}</Text>
                    <Text style={typography.caption}>{service.duration}</Text>
                  </View>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </View>
              ))}

              {remainingCount > 0 && (
                <Text
                  style={[
                    styles.serviceText,
                    { fontStyle: 'italic', color: colors.gray400 },
                  ]}
                >
                  See all {remainingCount} more services...
                </Text>
              )}
            </View>
          </View>
        </Pressable>
    );
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: colors.background }}
    >
        <SafeAreaView>
            <BottomSheetFlatList
                data={vendors}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderVendor}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    </BottomSheet>
  );
};

export default VendorBottomSheet;


const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  vendorCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  vendorInfo: {
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  servicesContainer: {
    marginTop: 8,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray100,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray800,
  },
  serviceText: {
    fontSize: 12,
    marginTop: 2,
  },
});
