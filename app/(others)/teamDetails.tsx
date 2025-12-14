import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import IconButton from '@/component/shared/IconButton';
import { ArrowLeft, Star1 } from 'iconsax-react-nativejs';
import StarRating from '@/component/shared/starRating';
import moment from 'moment';

const dayNameMap = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = dayMap[new Date().getDay()];


const TeamDetails = () => {
  const { vendor, member } = useLocalSearchParams();

  const vendorObj = vendor ? JSON.parse(vendor as string) : null;
  const memberObj = member ? JSON.parse(member as string) : null;

  console.log(memberObj)

  if (!memberObj) return null;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back */}
        <IconButton onPress={() => router.back()}>
          <ArrowLeft />
        </IconButton>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile */}
          <View style={styles.profileWrapper}>
            <Image source={memberObj.image} style={styles.avatar} />

            <Text style={typography.h3}>{memberObj.name}</Text>
            <Text style={typography.caption}>{memberObj.role}</Text>

            {/* Rating */}
                <View style={styles.ratingRow}>
                    <Star1 size={16} variant="Bold" color={colors.warning} />
                    <Text style={styles.ratingText}>
                        {memberObj.rating} • {memberObj.yearsOfExperience}+ yrs experience
                    </Text>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <StatBox label="Clients Served" value={memberObj.clientsServed} />
                <StatBox label="Appointments" value={memberObj.appointmentsCompleted} />
            </View>

            {/* Languages */}
            <Section title="Languages">
                <Text style={typography.subtitle}>
                {memberObj.languages?.join(', ') || 'N/A'}
                </Text>
            </Section>

            {/* Specialties */}
            <Section title="Specialties">
                <View style={styles.chipWrap}>
                {memberObj.specialties?.map((item: string, index: number) => (
                    <View key={index} style={styles.chip}>
                    <Text style={[typography.caption, styles.chipText]}>{item}</Text>
                    </View>
                ))}
                </View>
            </Section>

            {/* Availability */}
            <Section title="Availability">
            <View style={styles.availabilityGrid}>
                {memberObj.availability?.workingDays?.map((dayAbbr: string, index: number) => (
                <View key={index} style={styles.dayCard}>
                    {/* Map abbreviation to full weekday name */}
                    <Text style={[typography.subtitle, { color: colors.textPrimary }]}>
                    {dayNameMap[dayAbbr] || dayAbbr}
                    </Text>
                    <Text style={typography.caption}>
                    {memberObj.availability?.workingHours?.start} –{' '}
                    {memberObj.availability?.workingHours?.end}
                    </Text>
                </View>
                ))}
            </View>
            </Section>



          {/* Reviews */}
          <Section title="Reviews">
            {memberObj.reviews?.length > 0 ? (
              memberObj.reviews.map((review: any) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image source={review.image} style={styles.reviewAvatar} />
                    <View>
                      <Text style={typography.label}>{review.user}</Text>
                      <Text style={typography.caption}>{moment(review.date).format('ddd, DD MMM YYYY [at] HH:mm')}</Text>
                    </View>
                  </View>

                  <StarRating rating={review.rating} />


                  <Text style={typography.subtitle}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={typography.caption}>No reviews yet</Text>
            )}
          </Section>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TeamDetails;

/* ---------------- SMALL COMPONENTS ---------------- */

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={typography.h3}>{title}</Text>
    <View style={{ marginTop: 6 }}>{children}</View>
  </View>
);

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.statBox}>
    <Text style={typography.label}>{value}</Text>
    <Text style={typography.caption}>{label}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },

  profileWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },

  availabilityGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    dayCard: {
        width: '48%', // 2 columns, use ~30% for 3 columns
        padding: 10,
        marginBottom: 10,
        backgroundColor: colors.gray100,
        borderRadius: 10,
    },


  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },

  ratingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  statBox: {
    flex: 1,
    backgroundColor: colors.gray100,
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  section: {
    marginTop: 20,
  },

  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  chipText: {
    color: colors.primary,
  },

  reviewCard: {
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },

  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  reviewDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
