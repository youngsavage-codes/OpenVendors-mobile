import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '@/component/shared/IconButton';
import { ArrowLeft, CloseCircle, Profile2User, User } from 'iconsax-react-nativejs';
import { router, useLocalSearchParams } from 'expo-router';
import AppButton from '@/component/shared/button';
import PageTitle from '@/component/shared/PageTitle';
import { colors } from '@/theme/colors';
import SelectProfessionals from '@/component/shared/selectProfessional';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookingStore } from '@/store/bookingStore';

const professionalOptions = [
  {
    title: 'Single Appointment',
    subtitle: 'Schedule service for yourself',
    label: 'single',
    icon: <User variant="Bulk" />,
  },
  {
    title: 'Group Appointment',
    subtitle: 'For yourself and others',
    label: 'group',
    icon: <Profile2User variant="Bulk" />,
  },
];

const SelectProfessional = () => {
  const { setBookingType, bookingType } = useBookingStore();
  const {vendor} = useLocalSearchParams();

  const vendorObj = JSON.parse(vendor);

  const handleContinue = () => {
    router.push({
      pathname: '/(others)/seeAll',
      params: {
        type: 'service',
        vendor: JSON.stringify(vendorObj)
      }
    }
    )
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <IconButton onPress={() => router.back()}>
            <ArrowLeft />
          </IconButton>
          <IconButton onPress={() => {}}>
            <CloseCircle variant='Bulk' color='black' />
          </IconButton>
        </View>

        {/* Page Title */}
        <PageTitle title="Select Booking Type" />

        {/* Professional Options */}
        <View style={styles.optionsContainer}>
          {professionalOptions.map((option, index) => (
            <SelectProfessionals
              key={index}
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              selected={option.label === bookingType}
              onPress={() => setBookingType(option.label)}
            />
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <AppButton title="Continue" onPress={handleContinue} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SelectProfessional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },

  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10, // works in React Native 0.70+, otherwise use marginBottom in SelectProfessionals
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
