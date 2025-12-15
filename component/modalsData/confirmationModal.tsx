import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import React from 'react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ visible, title, message, onCancel, onConfirm }: ConfirmModalProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={[typography.h3, { marginBottom: 8 }]}>{title}</Text>
          <Text style={[typography.subtitle, { color: colors.gray600, marginBottom: 20 }]}>{message}</Text>

          <View style={styles.buttons}>
            <Pressable style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={[typography.subtitle, { color: colors.gray600 }]}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.confirm]} onPress={onConfirm}>
              <Text style={[typography.subtitle, { color: colors.background }]}>Proceed</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  cancel: {
    backgroundColor: colors.gray200,
  },
  confirm: {
    backgroundColor: colors.primary,
  },
});
