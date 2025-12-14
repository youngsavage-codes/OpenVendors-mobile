import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constant/images';
import IconButton from '@/component/shared/IconButton';
import { ArrowLeft, Heart, Share } from 'iconsax-react-nativejs';
import { fontFamily, fontSize } from '@/theme/fonts';
import { colors } from '@/theme/colors';
import { router, useLocalSearchParams } from 'expo-router';

import DetailsTabContent from '@/component/vendor/detailsTabContent';
import ServiceTabContent from '@/component/vendor/serviceTabContent';
import ReviewTabContent from '@/component/vendor/reviewTabContent';
import TeamTabContent from '@/component/vendor/teamTabContent';
import AboutTabContent from '@/component/vendor/aboutTabContent';
import SmallButton from '@/component/shared/smallButton';
import { typography } from '@/theme/typography';
import { vendors } from '@/constant/data';
import { useBookingStore } from '@/store/bookingStore';
import { useFavoriteVendorStore } from '@/store/favoriteVendorStore';

const TABS = [
  { key: 'images', label: 'Images' },
  { key: 'services', label: 'Services' },
  { key: 'team', label: 'Team' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'about', label: 'About' },
];

const { width } = Dimensions.get('window');

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [sectionPositions, setSectionPositions] = useState<{ [key: string]: number }>({});
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<Animated.ScrollView>(null);
  const tabScrollRef = useRef<ScrollView>(null);

  const { vendorId } = useLocalSearchParams();

  console.log(vendorId, vendorId)

  const { toggleFavorite, isFavorite } = useFavoriteVendorStore();
  const favorited = isFavorite(vendorId);

  const {singleServices, bookers, toggleService, bookingType} = useBookingStore()

  const vendor = vendors.find((v) => v.id === Number(vendorId));
  

  const handleNavigate = () => {
   if(bookingType === null) {
      router.push({
        params: { vendor: JSON.stringify(vendor) },
        pathname: '/(others)/selectProfessional'
      })
    } else {
        router.push({
          params: { 
            type: 'service',
            vendor: JSON.stringify(vendor) 
          },
          pathname: '/(others)/seeAll'
        })
    }
  }

  // Scroll to section on tab press
  const scrollToSection = (key: string) => {
    const y = sectionPositions[key] || 0;
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  // Update active tab while scrolling
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    let currentTab = 'images';
    for (let i = TABS.length - 1; i >= 0; i--) {
      const key = TABS[i].key;
      if (sectionPositions[key] !== undefined && y >= sectionPositions[key] - 120) {
        currentTab = key;
        break;
      }
    }
    if (currentTab !== activeTab) setActiveTab(currentTab);
  };

  // Smooth scroll active tab into view
  useEffect(() => {
    const index = TABS.findIndex((tab) => tab.key === activeTab);
    if (index !== -1 && tabScrollRef.current) {
      const tabWidth = 100; // approximate width
      const scrollX = tabWidth * index - 50; // center active tab
      tabScrollRef.current.scrollTo({ x: scrollX > 0 ? scrollX : 0, animated: true });
    }
  }, [activeTab]);

  // Header opacity
  const headerOpacity = scrollY.interpolate({ inputRange: [50, 150], outputRange: [0, 1], extrapolate: 'clamp' });

  // Record section positions on layout
  const handleSectionLayout = (key: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, [key]: y }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Animated Header */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <SafeAreaView style={styles.stickyHeaderRow}>
          <IconButton onPress={() => router.back()}>
            <ArrowLeft size={20} />
          </IconButton>
          <View style={styles.stickyActions}>
            <IconButton>
              <Share variant='Bold' size={20} />
            </IconButton>
            <IconButton onPress={() => toggleFavorite(vendorId)}>
              <Heart variant='Bold' size={20} color={favorited ? colors.danger : colors.textPrimary} />
            </IconButton>
          </View>
        </SafeAreaView>
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => scrollToSection(tab.key)}
              style={[styles.tabItem, activeTab === tab.key && styles.activeTab]}
            >
              <Text style={[typography.caption, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
      >
        {/* Swipeable Header Image */}
        <View style={styles.headerContainer}>
          <FlatList
            data={vendor?.imageStack}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ImageBackground source={item} style={styles.headerImage}>
                <View style={styles.overlay} />
              </ImageBackground>
            )}
          />
          {/* Overlay icons on top of FlatList */}
          <SafeAreaView style={styles.imageHeaderIcons}>
            <IconButton onPress={() => router.back()}>
              <ArrowLeft size={20} />
            </IconButton>
            <View style={styles.actionIconsImage}>
              <IconButton>
                <Share variant='Bold' size={20} />
              </IconButton>
              <IconButton onPress={() => toggleFavorite(vendorId)}>
                <Heart variant='Bold' size={20} color={favorited ? colors.danger : colors.textPrimary} />
              </IconButton>
            </View>
          </SafeAreaView>
        </View>

        {/* Sections */}
        <View style={styles.body}>
          {TABS.map((tab) => (
            <View
              key={tab.key}
              onLayout={(event) => handleSectionLayout(tab.key, event)}
              style={{ marginBottom: 0 }}
            >
              {tab.key === 'images' && <DetailsTabContent vendor={vendor} />}
              {tab.key === 'services' && <ServiceTabContent vendor={vendor} />}
              {tab.key === 'team' && <TeamTabContent vendor={vendor} />}
              {tab.key === 'reviews' && <ReviewTabContent vendor={vendor} />}
              {tab.key === 'about' && <AboutTabContent vendor={vendor} />}
            </View>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Bottom Book Button */}
      <View style={styles.bookContainer}>
        <Text style={typography.caption}>100 Services Available</Text>
        <SmallButton 
          title="Book Now" 
          onPress={handleNavigate} 
        />
      </View>
    </View>
  );
};

export default VendorProfile;

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute',
    top: 0,
    paddingTop: 10,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 500,
  },
  stickyHeaderRow: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickyActions: { flexDirection: 'row', gap: 10 },
  tabScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 28,
  },
  tabItem: { paddingVertical: 12 },
  tabText: { fontSize: 13, color: colors.gray600, fontFamily: fontFamily.medium },
  activeTab: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  activeTabText: { color: colors.primary, fontFamily: fontFamily.medium },

  headerContainer: { position: 'relative' },
  headerImage: {
    width: width,
    height: width * 0.9625, // 16:9 aspect ratio
    position: 'relative',
  },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  imageHeaderIcons: {
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIconsImage: { flexDirection: 'row', gap: 10 },
  body: { padding: 20 },
  bookContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: colors.gray200,
  },
  serviceCount: {
    fontFamily: fontFamily.medium,
    color: colors.gray400,
    fontSize: fontSize.sm,
  },
});
