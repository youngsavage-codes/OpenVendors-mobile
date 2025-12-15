import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';
import { typography } from '@/theme/typography';
import { router } from 'expo-router';
import { Add, TickSquare } from 'iconsax-react-nativejs';
import React, { useRef, useState } from 'react';
import { Alert, Animated, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartSummary from '../shared/CartSummary';
import PageTitle from '../shared/PageTitle';
import AuthHeader from '../shared/auth/authHeader';
import { useBookingStore } from '@/store/bookingStore';
import ActiveBooker from '../shared/activeBooker';
import ConfirmModal from '../modalsData/confirmationModal';

const Services = ({vendor}) => {
      const [activeCategory, setActiveCategory] = useState(vendor?.services[0].categoryName);
      const sectionPositions = useRef<{ [key: string]: number }>({});
      const scrollRef = useRef<ScrollView>(null);
      const {
        singleServices, 
        bookers, 
        toggleService, 
        totalPriceSingle, 
        bookingType, 
        totalDurationSingle, 
        activeBookerId, 
        totalDurationBooker, 
        totalPriceBooker
      } = useBookingStore()
      const [confirmVisible, setConfirmVisible] = useState(false);
      const [pendingService, setPendingService] = useState<any>(null);

      const booker = bookers?.find((b) => b.id === activeBookerId)

      const cart = bookingType === 'single' ? singleServices : booker?.services

      const total = bookingType === 'single' ? totalPriceSingle() : totalPriceBooker(activeBookerId)
      const duration = bookingType === 'single' ? totalDurationSingle() : totalDurationBooker(activeBookerId);

    const addService = (service: any) => {
      if (bookingType === 'single') {
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


    
      // === Animated Underline Position ===
      const indicatorX = useRef(new Animated.Value(0)).current;
      const tabLayouts = useRef<{ [key: string]: { x: number; width: number } }>({});
    
      const moveIndicator = (category: string) => {
        const layout = tabLayouts.current[category];
        if (!layout) return;
    
        Animated.timing(indicatorX, {
          toValue: layout.x,
          duration: 220,
          useNativeDriver: true,
        }).start();
      };
    
      const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = event.nativeEvent.contentOffset.y;
    
        for (let i = vendor?.services.length - 1; i >= 0; i--) {
          const cat = vendor?.services[i].category;
          if (sectionPositions.current[cat] <= y + 120) {
            if (activeCategory !== cat) {
              setActiveCategory(cat);
              moveIndicator(cat);
            }
            break;
          }
        }
      };
    
      const scrollToCategory = (category: string) => {
        const y = sectionPositions.current[category];
        if (y !== undefined) {
          scrollRef.current?.scrollTo({ y, animated: true });
          setActiveCategory(category);
          moveIndicator(category);
        }
      };
    
      const onLayoutTab = (category: string, e: LayoutChangeEvent) => {
        const { x, width } = e.nativeEvent.layout;
        tabLayouts.current[category] = { x, width };
    
        // Set default active position on first render
        if (category === activeCategory) moveIndicator(category);
      };
  return (
    <View style={{ flex: 1, padding: 20 }}>
        <SafeAreaView style={{ flex: 1 }}>
            <AuthHeader title='Services' showBack />

            {
              bookingType === 'group' && (
                <ActiveBooker vendorId={vendor?.id} />
              )
            }

            {/* Sticky Category Tabs */}
            <View style={styles.categoryContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 5 }}>
                  <View style={{ flexDirection: 'row', position: 'relative' }}>
                  {vendor?.services.map((cat, index) => (
                    <Pressable
                      key={index}
                      onPress={() => scrollToCategory(cat.category)}
                      onLayout={(e) => onLayoutTab(cat.category, e)}
                      style={[
                              styles.categoryTab,
                              activeCategory === cat.categoryName && styles.activeCategoryTab, // add active style
                          ]}
                      >
                          <Text
                              style={[
                              typography.caption,
                              activeCategory === cat.categoryName && styles.activeTabText,
                              ]}
                          >
                              {cat.categoryName}
                          </Text>
                      </Pressable>
                  ))}

                  </View>
              </ScrollView>
            </View>

            {/* Scrollable Services */}
            <ScrollView
              ref={scrollRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
            {vendor?.services?.map((section) => (
              <View
                key={section.categoryName}
                onLayout={(e) =>
                    (sectionPositions.current[section.categoryName] = e.nativeEvent.layout.y)
                }
                style={styles.sectionWrapper}
                >
                <PageTitle title={section.categoryName} />

                {section.items.map((item, index) => (
                    <View key={index} style={styles.serviceCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={typography.label}>{item.name}</Text>
                        <Text style={typography.tiny}>{item.duration}</Text>
                        <Text style={[typography.caption, styles.price]}>{item.price}</Text>
                    </View>
                    <Pressable 
                        onPress={() => addService(item)} 
                        style={{
                        borderRadius: 8,
                        }}
                    >
                        { 
                          cart?.find((s) => s.serviceId === item.serviceId) ? (
                              <TickSquare size={25} color={cart?.find((s) => s.serviceId === item.serviceId) && colors.primary} variant='Bulk' />
                          ) : (
                              <Add size={25} color={cart?.find((s) => s.serviceId !== item.serviceId) ? colors.gray400 : colors.gray400} variant='Bulk'  />
                          )
                        }
                    </Pressable>

                    </View>
                ))}
                </View>
            ))}
        </ScrollView>
        {
                cart?.length! > 0 && (
                    <CartSummary
                        totalPrice={total}
                        totalDuration={duration}
                        totalItems={cart?.length!}
                        onContinue={() => router.push({
                          pathname: '/(others)/setBookingDetails',
                          params: {
                            vendor: JSON.stringify(vendor)
                          }
                        })}
                    />
                )
        }
          <ConfirmModal
            visible={confirmVisible}
            title="Warning"
            message="This booker already has services from another vendor. Adding a service from this vendor will clear their current selections. Do you want to proceed?"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        </SafeAreaView>
        
    </View>
  )
}

export default Services

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  categoryTab: {
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginRight: 10,
  },

  categoryText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.gray600,
  },

  activeTabText: {
    color: colors.primary,
  },

  // The sliding underline bar
  indicator: {
    bottom: 0,
    height: 2,
    backgroundColor: colors.primary,
    width: 20, // Will be stretched but animated by translateX
    borderRadius: 10,
  },

  sectionWrapper: {
    paddingTop: 10,
  },

  serviceCard: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

    activeCategoryTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
    },


  serviceName: {
    fontFamily: fontFamily.medium, 
    fontSize: fontSize.sm, 
    marginBottom: 2, 
    flexShrink: 1, 
    flexWrap: 'wrap', 
    lineHeight: 23
  },
  
  price: {
    color: colors.primary,
  },
});