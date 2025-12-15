import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import { useBookingStore } from '@/store/bookingStore'
import IconButton from './IconButton'
import { UserAdd } from 'iconsax-react-nativejs'
import BookersData from '../modalsData/bookersData'

const ActiveBooker = ({vendorId}) => {
  const [isVisible, setIsVisible] = useState(false)
  const { bookers, activeBookerId } = useBookingStore()

  const booker = bookers.find((b) => b.id === activeBookerId)

  const initials =
    booker?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '??'

  return (
    <>
      <View style={styles.container}>
        {/* Left */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View>
            <Text style={styles.name}>{booker?.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active Booker</Text>
            </View>
          </View>
        </View>

        {/* Right */}
        <IconButton onPress={() => setIsVisible(true)} style={styles.addBtn}>
          <UserAdd size={18} variant="Bulk" color={colors.primary} />
        </IconButton>
      </View>

      <BookersData visible={isVisible} setDismiss={setIsVisible} vendorId={vendorId} />
    </>
  )
}

export default ActiveBooker

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: colors.background,
    marginTop: 16,
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    ...typography.subtitle,
    color: colors.primary,
    fontWeight: '600',
  },

  name: {
    ...typography.subtitle,
    fontWeight: '600',
  },

  badge: {
    marginTop: 2,
    alignSelf: 'flex-start',
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },

  addBtn: {
    backgroundColor: colors.primary + '15',
    borderRadius: 12,
    padding: 6,
  },
})
