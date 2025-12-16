import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Circle } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { vendors } from '@/constant/data';
import { HamburgerMenu,  SearchNormal, Star1 } from 'iconsax-react-nativejs';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import VendorBottomSheet from '@/component/shared/vendorBottomSheet';
import { ImageBackground } from 'react-native';
import { router } from 'expo-router';
import IconButton from '@/component/shared/IconButton';
import { useFilterStore } from '@/store/filterStore';

const USER_LOCATION = { latitude: 6.5244, longitude: 3.3792 };

const getCircleBounds = (
  { latitude, longitude }: { latitude: number; longitude: number },
  radiusMeters: number
) => {
  const latDelta = radiusMeters / 111_000;
  const lngDelta = radiusMeters / (111_000 * Math.cos(latitude * (Math.PI / 180)));

  return {
    latitude,
    longitude,
    latitudeDelta: latDelta * 2,
    longitudeDelta: lngDelta * 2,
  };
};


const Search = () => {
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const { categories } = useFilterStore();

  const zoomToLocation = (lat: number, lng: number) => {
    mapRef.current?.animateToRegion(
      { latitude: lat, longitude: lng, latitudeDelta: 0.03, longitudeDelta: 0.03 },
      600
    );
  };

  const openBottomSheet = () => {
    sheetRef.current?.expand(); // or .snapToIndex(0)
  };


  const onVendorPress = (vendor: any) => {
    setSelectedVendor(vendor);
    zoomToLocation(vendor.latlog.lat, vendor.latlog.lng);
  };

  const closeCard = () => setSelectedVendor(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        {/* PAGE HEADER */}
        <View style={styles.pageHeader}>
          <IconButton onPress={() => router.push('/(others)/mapSearch')}>
            <SearchNormal />
          </IconButton>

          <View>
            <Text style={typography.label}>All Treatments</Text>
            <Text style={typography.caption}>Current Location</Text>
          </View>

          <IconButton onPress={openBottomSheet}>
            <HamburgerMenu />
          </IconButton>
        </View>

      
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          ...USER_LOCATION,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        onMapReady={() => {
          const region = getCircleBounds(USER_LOCATION, 2000);
          mapRef.current?.animateToRegion(region, 600);
        }}
      >
        <Circle center={USER_LOCATION} radius={2000} fillColor="rgba(0,150,255,0.15)" strokeColor="transparent" />
        {/* <Marker coordinate={USER_LOCATION} title="You" pinColor="blue" /> */}

        {vendors.map(
          (v) =>
            v.latlog && (
              <Marker
                key={v.id}
                coordinate={{ latitude: v.latlog.lat, longitude: v.latlog.lng }}
                onPress={() => onVendorPress(v)}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: 2,
                    paddingHorizontal: 6,
                    borderRadius: 5,
                    
                  }}
                >
                  <Text style={typography.tiny}>4.6</Text>
                </View>
              </Marker>
            )
        )}
      </MapView>

      {/* Quick Vendor Card when marker is pressed */}
      {selectedVendor && (
        <Pressable onPress={() => router.push({
              pathname: '/(others)/vendorProfile',
              params: { vendorId: selectedVendor.id }, // Pass as params, not query string
            })} style={styles.cardContainer}>
          <ImageBackground source={selectedVendor.image} style={styles.vendorImage}>
            <TouchableOpacity onPress={closeCard} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: colors.background }}>✕</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={typography.title}>{selectedVendor.name}</Text>
              <View style={styles.ratingRow}>
                <Star1 variant="Bold" size={15} color="#FFD700" />
                <Text style={typography.tiny}>
                  {selectedVendor.rating} ({selectedVendor.reviews?.length || 0})
                </Text>
              </View>
            </View>
            <Text style={typography.caption}>{selectedVendor.location}</Text>
          </View>
        </Pressable>
      )}

      {/* Full Bottom Sheet for all vendors */}
      <VendorBottomSheet vendors={vendors} sheetRef={sheetRef} />
    </GestureHandlerRootView>
  );
};

export default Search;

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',     // centers horizontally
    overflow: 'hidden',
    backgroundColor: colors.background,
    borderRadius: 8,
    shadowColor: colors.gray600,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: '70%',
    width: '80%',            // you can adjust this
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  vendorImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 4,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray100,
    padding: 10,
    borderRadius: 8,
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray800,
  },

  pageHeader: {
    position: 'absolute',
    top: 40,
    zIndex: 20,
    height: 56,
    width: '90%',
    paddingHorizontal: 7,
    borderRadius: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray200,

    alignSelf: 'center', // 👈 THIS CENTERS IT
  },


  pageTitle: {
    ...typography.subtitle,
  },

  backIcon: {
    fontSize: 22,
    color: colors.gray600,
  },

});
