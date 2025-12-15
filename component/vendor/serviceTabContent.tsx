
import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';
import { typography } from '@/theme/typography';
import { router } from 'expo-router';
import { Add, TickSquare } from 'iconsax-react-nativejs';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PageTitle from '../shared/PageTitle';
import { useBookingStore } from '@/store/bookingStore';
import ConfirmModal from '../modalsData/confirmationModal';

const ServiceTabContent = ({vendor}) => {
  const [selectedCategory, setSelectedCategory] = useState(vendor.services[0].categoryName);
  const [showAll, setShowAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {bookingType, toggleService, bookers, singleServices, activeBookerId} = useBookingStore()
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingService, setPendingService] = useState<any>(null);

  const handleBook = (service: any) => {
    if(bookingType === null) {
      router.push({
        params: { vendor: JSON.stringify(vendor) },
        pathname: '/(others)/selectProfessional'
      })
    } else if (bookingType === 'single') {
      toggleService(vendor?.id, service);
    } else {
      if (booker?.vendorId && booker.vendorId !== vendor?.id) {
        // Show custom modal instead of alert
        setPendingService(service);
        setConfirmVisible(true);
      } else {
        toggleService(vendor?.id, service);
      }
    }
  };

  // Modal handlers
const handleConfirm = () => {
  if (pendingService) toggleService(vendor?.id, pendingService);
  setPendingService(null);
  setConfirmVisible(false);
};

const handleCancel = () => {
  setPendingService(null);
  setConfirmVisible(false);
};

  const booker = bookers?.find((b) => b.id === activeBookerId)

  const cart = bookingType === 'single' ? singleServices : booker?.services

  const currentCategory = vendor.services.find((c) => c.categoryName === selectedCategory);
  const servicesToShow = currentCategory?.items.slice(0, showAll ? undefined : 5) || [];

  return (
    <View style={styles.container}>
      <PageTitle title="Services" showViewAll={false} />

      {/* Horizontal category tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {vendor.services.map((category) => (
          <Pressable
            key={category.categoryName}
            onPress={() => {
              setSelectedCategory(category.categoryName);
              setShowAll(false); // reset when switching categories
            }}
            style={[
              styles.categoryTab,
              selectedCategory === category.categoryName && styles.categoryTabActive,
            ]}
          >
            <Text
              style={[
                typography.caption,
                selectedCategory === category.categoryName && styles.categoryTextActive,
              ]}
            >
              {category.categoryName}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Services list */}
      <View style={styles.servicesList}>
        {servicesToShow.map((service) => (
          <View key={service.name} style={styles.serviceRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={[typography.label]}>{service.name}</Text>
              <Text style={[typography.tiny]}>{service.duration}</Text>
              <Text style={[typography.caption, styles.servicePrice]}>{service.price}</Text>
            </View>

            <Pressable onPress={() => handleBook(service)}>
               { 
                cart?.find((s) => s.serviceId === service.serviceId) ? (
                  <TickSquare size={25} color={cart?.find((s) => s.serviceId === service.serviceId) && colors.primary} variant='Bulk' />
                ) : (
                  <Add size={25} color={cart?.find((s) => s.serviceId !== service.serviceId) ? colors.gray400 : colors.gray400} variant='Bulk'  />
                )
              }
            </Pressable>
          </View>
        ))}

        {/* See All button */}
        {currentCategory && currentCategory.items.length > 5 && !showAll && (
          <Pressable style={styles.seeAllButton} onPress={() => router.push(
            {
              pathname: '/(others)/seeAll',
              params: {
                type: 'service',
                vendor: JSON.stringify(vendor)
              } 
            })}>
            <Text style={[typography.caption, styles.seeAllText]}>See All</Text>
          </Pressable>
        )}
      </View>
        <ConfirmModal
            visible={confirmVisible}
            title="Warning"
            message="This booker already has services from another vendor. Adding a service from this vendor will clear their current selections. Do you want to proceed?"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
    </View>
  );
};

export default ServiceTabContent;

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: { fontFamily: fontFamily.medium, fontSize: fontSize.lg, marginBottom: 12 },
  categoryScroll: { marginBottom: 15 },
  categoryTab: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, marginRight: 10 },
  categoryTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { fontFamily: fontFamily.medium, fontSize: fontSize.xs, color: colors.gray600 },
  categoryTextActive: { color: '#fff' },
  servicesList: { marginTop: 5 },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray200,
  },
  serviceName: { fontFamily: fontFamily.medium, fontSize: fontSize.sm, marginBottom: 2, flexShrink: 1, flexWrap: 'wrap', lineHeight: 23 },
  serviceDuration: { fontFamily: fontFamily.medium, fontSize: fontSize.xs, color: colors.gray600 },
  servicePrice: { 
    color: colors.primary,
  },
  seeAllButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 0.5, 
    borderColor: colors.gray200,
    width: '100%'
  },
  seeAllText: { textAlign: 'center' },
});
