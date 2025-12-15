import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import { ArrowRight2, UserSquare, Calendar, Setting2, Cards, Headphone, QuoteDown, Messages1, Logout,  } from 'iconsax-react-nativejs'

const Profile = () => {
  const menuItems = [
    { title: 'Profile', icon: <UserSquare size={20} variant='Bulk' />, onPress: () => {} },
    { title: 'Bookings', icon: <Calendar size={20} variant='Bulk' />, onPress: () => {} },
    { title: 'Payments', icon: <Cards size={20} variant='Bulk' />, onPress: () => {} },
    { title: 'Settings', icon: <Setting2 size={20} variant='Bulk' />, onPress: () => {} },
  ]

const supportItems = [
  { title: 'Help Center', icon: <Headphone size={20} variant='Bulk' />, onPress: () => {} },
  { title: 'Contact Us', icon: <QuoteDown size={20} variant='Bulk' />, onPress: () => {} },
  { title: 'Report Issue', icon: <Messages1 size={20} variant='Bulk' />, onPress: () => {} },
]


  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <SafeAreaView>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <View>
            <Text style={typography.title}>Muctar Mohammed</Text>
            <Text style={typography.caption}>Personal Account</Text>
          </View>
          <View style={styles.avatar}>
            <Text>MM</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.cardContainer, { marginBottom: 15 }]}>
            {menuItems.map((item, index) => (
                <Pressable
                  key={index}
                  style={styles.cardPressable}
                  onPress={item.onPress}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {item.icon}
                    <Text style={typography.label}>{item.title}</Text>
                  </View>
                  <ArrowRight2 size={18} />
                </Pressable>
            ))}
          </View>
          <View style={[styles.cardContainer, { marginBottom: 15 }]}>
            {supportItems.map((item, index) => (
                <Pressable
                  key={index}
                  style={styles.cardPressable}
                  onPress={item.onPress}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {item.icon}
                    <Text style={typography.label}>{item.title}</Text>
                  </View>
                  <ArrowRight2 size={18} />
                </Pressable>
            ))}
          </View>
          <View style={[styles.cardContainer, { marginBottom: 15 }]}>
                <Pressable
                  style={styles.cardPressable}
                  onPress={() => {}}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Logout size={20} variant='Bulk' />
                    <Text style={typography.label}>Log out</Text>
                  </View>
                  <ArrowRight2 size={18} />
                </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 15,
    padding: 10,
    backgroundColor: colors.background,
    // iOS shadow
    shadowColor: colors.gray400,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Android shadow
    elevation: 1,
  },
  cardPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
})
