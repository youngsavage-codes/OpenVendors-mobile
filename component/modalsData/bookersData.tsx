import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import BottomSheet from '../shared/bottomSheet';
import { useBookingStore } from '@/store/bookingStore';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { Add, Trash } from 'iconsax-react-nativejs';
import ConfirmModal from './confirmationModal';

const BookersData = ({ visible, setDismiss, vendorId }: any) => {
  const {
    bookers,
    activeBookerId,
    setActiveBooker,
    addBooker,
    removeBooker,
    clearActiveBookerServices,
  } = useBookingStore();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedBooker, setSelectedBooker] = useState<any>(null);

  const handleSelectBooker = (bok: any) => {
    if (bok.vendorId && bok.vendorId !== vendorId) {
      // Show custom modal instead of Alert
      setSelectedBooker(bok);
      setConfirmVisible(true);
    } else {
      setActiveBooker(bok.id);
      setDismiss(false);
    }
  };

  const handleConfirm = () => {
    if (selectedBooker) {
      setActiveBooker(selectedBooker.id);
      clearActiveBookerServices();
      setSelectedBooker(null);
      setConfirmVisible(false);
      setDismiss(false);
    }
  };

  const handleCancel = () => {
    setSelectedBooker(null);
    setConfirmVisible(false);
  };

  return (
    <BottomSheet modalVisible={visible} setModalVisible={setDismiss}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={typography.h3}>Bookers</Text>
        <Text style={typography.caption}>Select who you’re booking for</Text>
      </View>

      {/* BOOKERS LIST */}
      <View style={styles.list}>
        {bookers.map((bok) => {
          const initials =
            bok.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase() || '??';

          const isActive = bok.id === activeBookerId;

          return (
            <Pressable
              key={bok.id}
              onPress={() => handleSelectBooker(bok)}
              style={({ pressed }) => [
                styles.bookerRow,
                isActive && styles.activeRow,
                pressed && styles.pressedRow,
              ]}
            >
              {/* AVATAR */}
              <View style={[styles.avatar, isActive && styles.activeAvatar]}>
                <Text style={[typography.subtitle, isActive && styles.activeAvatarText]}>
                  {initials}
                </Text>
              </View>

              {/* NAME */}
              <View style={{ flex: 1 }}>
                <Text style={typography.subtitle}>{bok.name}</Text>
                {isActive && (
                  <Text style={[typography.caption, styles.activeText]}>Currently active</Text>
                )}
              </View>

              {/* REMOVE */}
              {bok.name !== 'You' && (
                <Pressable
                  onPress={() => removeBooker(bok.id)}
                  hitSlop={12}
                  style={styles.trashBtn}
                >
                  <Trash size={18} color={colors.gray600} />
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* ADD BOOKER */}
      <Pressable
        style={({ pressed }) => [styles.addRow, pressed && styles.pressedAdd]}
        onPress={() => addBooker()}
      >
        <View style={styles.addIcon}>
          <Add size={18} color={colors.background} />
        </View>
        <Text style={styles.addText}>Add another booker</Text>
      </Pressable>

      {/* CONFIRMATION MODAL */}
      <ConfirmModal
        visible={confirmVisible}
        title="Warning"
        message="This booker already has services from another vendor. Switching will clear their current selections. Do you want to proceed?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </BottomSheet>
  );
};

export default BookersData;

const styles = StyleSheet.create({
  header: { marginBottom: 16 },
  list: { gap: 6 },
  bookerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  pressedRow: { opacity: 0.7 },
  activeRow: {
    backgroundColor: colors.primary + '12',
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeAvatar: { backgroundColor: colors.primary },
  activeAvatarText: { color: colors.background, fontWeight: '600' },
  activeText: { color: colors.primary, marginTop: 2 },
  trashBtn: { padding: 6 },
  addRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.primary + '12',
  },
  pressedAdd: { opacity: 0.7 },
  addIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { ...typography.subtitle, color: colors.primary, fontWeight: '600' },
});
