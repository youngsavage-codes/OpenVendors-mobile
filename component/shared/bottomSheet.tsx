import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '@/theme/colors';
import IconButton from './IconButton';
import { ArrowLeft, CloseCircle } from 'iconsax-react-nativejs';

interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children: React.ReactNode;
  style?: any;
}

const BottomSheet = ({
  modalVisible,
  setModalVisible,
  children,
  style,
}: BottomSheetProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalView, style]}>
          {/* HEADER */}
          <View style={styles.header}>
            <IconButton onPress={() => setModalVisible(false)}>
              <CloseCircle size={20} />
            </IconButton>
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },

  modalView: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    alignItems: 'flex-end',
  },

  content: {
    paddingHorizontal: 20,
  },
});
