import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize, fontWeight } from '@/theme/fonts';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import PageTitle from '../shared/PageTitle';
import { typography } from '@/theme/typography';
import StarRating from '../shared/starRating';

const reviews = [
  {
    name: 'Jane Doe',
    avatar: '',
    date: '2025-12-11T17:50:00',
    rating: 4.5,
    message: 'Great service! Very professional and friendly.',
  },
  {
    name: 'John Smith',
    avatar: '',
    date: '2025-12-10T14:30:00',
    rating: 5,
    message: 'Loved the experience. Highly recommend!',
  },
  {
    name: 'Alice Johnson',
    avatar: '',
    date: '2025-12-09T09:15:00',
    rating: 4,
    message: 'Good service, but could improve timing.',
  },
  {
    name: 'Bob Williams',
    avatar: '',
    date: '2025-12-08T11:20:00',
    rating: 3.5,
    message: 'Average service, but staff was polite.',
  },
  {
    name: 'Sarah Parker',
    avatar: '',
    date: '2025-12-07T10:00:00',
    rating: 5,
    message: 'Excellent! Will come back again.',
  },
];

const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.map((n) => n[0]).join('').toUpperCase();
};

const ReviewTabContent = ({vendor}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? vendor?.reviews : vendor?.reviews.slice(0, 3);

  return (
    <View style={styles.container}>
      <PageTitle title="Reviews" showViewAll={false} />

      {displayedReviews.map((review, index) => (
        <View key={index}>
          {/* Avatar or initials */}
          <View style={styles.reviewCard}>
            <View>
                {review.image ? (
                  <Image source={review.image} style={styles.avatar} />
                ) : (
                  <View style={styles.initialsContainer}>
                    <Text style={typography.title}>{getInitials(review.user)}</Text>
                  </View>
                )}
            </View>
            <View>
              <Text style={[typography.label]}>{review.user}</Text>
              <Text style={[typography.caption]}>{moment(review.date).format('ddd, DD MMM YYYY [at] HH:mm')}</Text>
            </View>
          </View>

          {/* Review content */}
          <View style={{marginBottom: 15}}>
            <View style={styles.stars}>
              <StarRating rating={review.rating} />
            </View>

            <Text style={typography.subtitle}>{review?.comment}</Text>
          </View>
        </View>
      ))}

      {/* See All / Show Less Button */}
      {vendor?.reviews.length > 3 && (
        <Pressable onPress={() => setShowAll(!showAll)} style={styles.seeAllButton}>
          <Text style={[typography.caption, styles.seeAllText]}>{showAll ? 'Show Less' : 'See All'}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ReviewTabContent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialsText: {
    color: '#fff',
    fontWeight: fontWeight.medium,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  date: {
    fontFamily: fontFamily.light,
    fontSize: fontSize.xs,
    color: colors.gray400,
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  message: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.gray600,
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
