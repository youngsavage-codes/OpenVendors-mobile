import React from 'react'
import { View, Pressable, Image, StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import { Category2, Element4, NotificationBing, ShoppingCart } from 'iconsax-react-nativejs'
import { images } from '@/constant/images'
import IconButton from '../shared/IconButton'

const Header = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image
          source={images.hero}
          style={styles.avatar}
          resizeMode="cover"
        />
      </Pressable>

      <View style={styles.rightSection}>
        <IconButton onPress={undefined}>
            <NotificationBing size={25} color={colors.textPrimary} variant='Bulk' />
        </IconButton>
        <IconButton onPress={undefined}>
          <ShoppingCart size={25} color={colors.textPrimary} variant='Bulk' />
        </IconButton>

      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray200,
    padding: 8,
    borderRadius: 50,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
})
