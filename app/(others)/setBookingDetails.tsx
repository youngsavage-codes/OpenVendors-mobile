import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CloseCircle, Calendar1, Timer, TimerStart } from 'iconsax-react-nativejs';
import IconButton from '@/component/shared/IconButton';
import Calendar from '@/component/shared/calender';
import TimeMap from '@/component/shared/timePicker';
import CartSummary from '@/component/shared/CartSummary';
import AlreadyHaveAccount from '@/component/shared/auth/AlreadyHaveAccount';
import { useBookingStore } from '@/store/bookingStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import ActiveBooker from '@/component/shared/activeBooker';

const SetBookingDetails = () => {
  const {
    bookingType,
    singleServices,
    bookers,
    activeBookerId,
    totalPriceSingle,
    totalDurationSingle,
    setSingleDateTime,
    setActiveBookerDateTime,
    singleDate,
    singleTime,
    totalPriceBooker,
    totalDurationBooker
  } = useBookingStore();

  const booker = bookers?.find((b) => b.id === activeBookerId)

  const currentDate =
  bookingType === 'single'
    ? singleDate
    : booker?.date;

const currentTime =
  bookingType === 'single'
    ? singleTime
    : booker?.time;


  const [selectedDate, setSelectedDate] = useState<Date | null>(
    currentDate ? new Date(currentDate) : null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    currentTime || null
  );

  const cart = bookingType === 'single' ? singleServices : booker?.services

  const total = bookingType === 'single' ? totalPriceSingle() : totalPriceBooker(activeBookerId)
  const duration = bookingType === 'single' ? totalDurationSingle() : totalDurationBooker(activeBookerId)

  const { vendor } = useLocalSearchParams();
  const vendorObj = JSON.parse(vendor);


  const noSlots = selectedDate?.getDay() === 0; // Sundays closed

  // Sync local state with store
  useEffect(() => {
    if (currentDate) {
      setSelectedDate(new Date(currentDate));
    } else {
      setSelectedDate(null);
    }

    if (currentTime) {
      setSelectedTime(currentTime);
    } else {
      setSelectedTime(null);
    }
  }, [currentDate, currentTime, activeBookerId]);


  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);

    if (bookingType === 'single') {
      setSingleDateTime(date.toISOString(), null);
    } else {
      setActiveBookerDateTime(date.toISOString(), null);
    }
  };


  const handleTimeSelect = (time: string) => {
    if (!selectedDate) return;

    setSelectedTime(time);

    if (bookingType === 'single') {
      setSingleDateTime(selectedDate.toISOString(), time);
    } else {
      setActiveBookerDateTime(selectedDate.toISOString(), time);
    }
  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        {/* Back & Close */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onPress={() => router.back()}><ArrowLeft /></IconButton>
          <IconButton onPress={() => {}}><CloseCircle variant="Bulk" color="black" /></IconButton>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
          {/* Header */}
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: colors.gray200, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={typography.label}>MM</Text>
              </View>
              <Text style={typography.body}>Any Professional</Text>
            </View>
            <IconButton><Calendar1 variant="Bulk" /></IconButton>
          </View> */}
          {
            bookingType === 'group' && (
              <View style={{marginBottom: 20}}>
                <ActiveBooker vendorId={vendorObj?.id} />
              </View>
            )
          }

          {/* Calendar */}
          <Calendar onSelectDate={handleDateSelect} selectedDate={selectedDate} />

          {/* Empty State: No date */}
          {!selectedDate && (
            <View style={styles.emptyWrapper}>
              <View style={styles.emptyIcon}><Timer variant="Bulk" color={colors.gray600} size={36} /></View>
              <Text style={[typography.h3, styles.center]}>Select a Date</Text>
              <Text style={[typography.subtitle, styles.subText, styles.center]}>
                Choose a date from the calendar to view available time slots.
              </Text>
            </View>
          )}

          {/* Empty State: No slots */}
          {selectedDate && noSlots && (
            <View style={styles.emptyWrapper}>
              <View style={styles.emptyIcon}><TimerStart variant="Bulk" color={colors.gray400} size={36} /></View>
              <Text style={[typography.h3, styles.center]}>No Time Slots Available</Text>
              <Text style={[typography.subtitle, styles.subText, styles.center]}>
                There are no available booking times for this day.
              </Text>
              <Text style={[typography.subtitle, styles.center, { color: colors.primary, marginTop: 8 }]}>
                Please choose another date.
              </Text>
            </View>
          )}

          {/* Time picker */}
          {selectedDate && !noSlots && (
            <TimeMap openingTime="09:00" closingTime="17:00" intervalMinutes={30} onSelectTime={handleTimeSelect} selectedTime={selectedTime} />
          )}

          {/* CTA: Waitlist */}
          {selectedDate && (
            <AlreadyHaveAccount
              questionText="Can't find a suitable time?"
              actionText="Join Waitlist"
              onPress={() => router.push('/(others)/joinWaitlist')}
            />
          )}
        </ScrollView>

        {/* Cart Summary */}
        {cart?.length! > 0 && (
          <CartSummary
            totalPrice={total}
            totalDuration={duration}
            totalItems={cart?.length!}
            disabled={selectedDate === null || selectedTime === null}
            onContinue={() => router.push({
              pathname: '/(others)/firstTimeVisit',
              params: { vendor: JSON.stringify(vendorObj) }
            })}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default SetBookingDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  emptyWrapper: { alignItems: 'center', marginTop: 30, paddingHorizontal: 20 },
  emptyIcon: { backgroundColor: colors.gray100, padding: 20, borderRadius: 50, marginBottom: 15, justifyContent: 'center', alignItems: 'center' },
  center: { textAlign: 'center' },
  subText: { color: colors.gray600, marginTop: 4 },
});
