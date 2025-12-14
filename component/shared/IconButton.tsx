import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { colors } from '@/theme/colors'

interface IconButtonProps {
  children: ReactNode
  size?: number
  onPress?: () => void
  background?: string
  style?: ViewStyle
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  size = 44,
  onPress,
  background = colors.gray100,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size, backgroundColor: background },
        style,
      ]}
    >
      {children}
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
