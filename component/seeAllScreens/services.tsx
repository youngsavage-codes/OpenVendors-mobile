import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';
import { typography } from '@/theme/typography';
import { router } from 'expo-router';
import { Add, TickSquare } from 'iconsax-react-nativejs';
import React, { useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartSummary from '../shared/CartSummary';
import PageTitle from '../shared/PageTitle';
import AuthHeader from '../shared/auth/authHeader';
import { useBookingStore } from '@/store/bookingStore';

const Services = ({vendor}) => {
      const [activeCategory, setActiveCategory] = useState(vendor?.services[0].categoryName);
      const sectionPositions = useRef<{ [key: string]: number }>({});
      const scrollRef = useRef<ScrollView>(null);
      const {singleServices, bookers, toggleService, totalPriceSingle, bookingType, totalDurationSingle} = useBookingStore()

      const cart = singleServices || bookers?.services
    
    
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
                        onPress={() => toggleService(vendor?.id, item)} 
                        style={{
                        borderRadius: 8,
                        }}
                    >
                        { 
                          cart.find((s) => s.serviceId === item.serviceId) ? (
                              <TickSquare size={25} color={cart.find((s) => s.serviceId === item.serviceId) && colors.primary} variant='Bulk' />
                          ) : (
                              <Add size={25} color={cart.find((s) => s.serviceId !== item.serviceId) ? colors.gray400 : colors.gray400} variant='Bulk'  />
                          )
                        }
                    </Pressable>

                    </View>
                ))}
                </View>
            ))}
        </ScrollView>
        {
                cart.length > 0 && (
                    <CartSummary
                        totalPrice={bookingType === 'single' && totalPriceSingle() as any}
                        totalDuration={bookingType === 'single' && totalDurationSingle() as any}
                        totalItems={cart.length}
                        onContinue={() => router.push({
                          pathname: '/(others)/setBookingDetails',
                          params: {
                            vendor: JSON.stringify(vendor)
                          }
                        })}
                    />
                )
        }
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