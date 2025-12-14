import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';
import NearbyVendor from '../home/nearbyVendor';
import PageTitle from '../shared/PageTitle';
import { typography } from '@/theme/typography';

const dayNameMap = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AboutTabContent = ({ vendor }) => {
  if (!vendor) return null;

  const today = dayMap[new Date().getDay()]; // e.g., 'Thursday'

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* About Section */}
        <View style={styles.section}>
          <PageTitle title="About" showViewAll={false} />
          <Text style={typography.description}>{vendor?.about}</Text>
        </View>

        {/* Opening Times Section */}
        // Inside your AboutTabContent component
<View style={styles.section}>
  <PageTitle title="Opening Times" showViewAll={false} />
  <View style={styles.availabilityGrid}>
    {vendor?.openingDays.map((dayAbbr, index) => {
      const dayFull = dayNameMap[dayAbbr];
      const isToday = dayFull === today;
      const isClosed = vendor.openingTime.toLowerCase() === 'closed' || dayAbbr === 'Sun';

      return (
        <View
          key={index}
          style={[
            styles.dayCard,
            isToday && { borderColor: colors.primary, borderWidth: 1 },
            isClosed && { opacity: 0.6 },
          ]}
        >
          <Text
            style={[
              typography.label,
              isToday && { fontFamily: fontFamily.medium, color: colors.textPrimary },
              isClosed && { color: colors.gray400 },
            ]}
          >
            {dayFull}
          </Text>
          <Text
            style={[
              typography.caption,
              isToday && { fontFamily: fontFamily.medium, color: colors.textPrimary },
              isClosed && { color: colors.gray400 },
            ]}
          >
            {isClosed ? 'Closed' : `${vendor.openingTime} - ${vendor.closingTime}`}
          </Text>
        </View>
      );
    })}
  </View>
</View>


        {/* Additional Information Section */}
        <View style={styles.section}>
          <PageTitle title="Additional Information" showViewAll={false} />
          <Text style={typography.description}>
            We offer walk-ins and appointments. All services are performed by experienced professionals.
          </Text>
        </View>

        {/* Address & Map Section */}
        <View style={styles.section}>
          <PageTitle title="Address" showViewAll={false} />
          <Text style={typography.description}>{vendor.location ?? '123 Beauty Street, Lagos, Nigeria'}</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: colors.gray400 }}>Map Placeholder</Text>
          </View>
        </View>

        <NearbyVendor />
      </ScrollView>
    </View>
  );
};

export default AboutTabContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 10,
  },
  openingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  availabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayCard: {
    width: '48%', // two columns
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.gray100,
  },

});
