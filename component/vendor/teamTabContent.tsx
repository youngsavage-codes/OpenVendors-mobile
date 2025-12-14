import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize, fontWeight } from '@/theme/fonts';
import { Star1 } from 'iconsax-react-nativejs';
import PageTitle from '../shared/PageTitle';
import { typography } from '@/theme/typography';
import { router } from 'expo-router';

const teamMembers = [
  { name: 'Young Savage', role: 'Developer', avatar: '', rating: 4.5 },
  { name: 'Jane Doe', role: 'Designer', avatar: '', rating: 4.7 },
  { name: 'John Smith', role: 'Project Manager', avatar: '', rating: 4.6 },
  { name: 'Alice Johnson', role: 'QA Engineer', avatar: '', rating: 4.8 },
  { name: 'Bob Williams', role: 'DevOps', avatar: '', rating: 4.4 },
];

const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.map((n) => n[0]).join('').toUpperCase();
};

const TeamTabContent = ({vendor}) => {
  return (
    <View style={styles.container}>
      <PageTitle title="Team" showViewAll={false} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {vendor?.team?.map((member, index) => (
          <Pressable onPress={() => router.push({
            pathname: '/(others)/teamDetails',
            params: {
              vendor: JSON.stringify(vendor),
              member: JSON.stringify(member)
            }
          })} key={index} style={styles.memberCard}>
            {member.image ? (
              <Image source={member.image} style={styles.avatar} />
            ) : (
              <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>{getInitials(member.name)}</Text>
              </View>
            )}

            <Text style={typography.label}>{member.name}</Text>
            <Text style={typography.caption}>{member.role}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default TeamTabContent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  memberCard: {
    width: 110,
    marginRight: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 4,
  },
  initialsContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  initialsText: {
    color: '#fff',
    fontWeight: fontWeight.regular,
    fontSize: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.gray200,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 4,
  },
  name: {
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  role: {
    fontSize: 12,
    color: colors.gray400,
    textAlign: 'center',
  },
});
