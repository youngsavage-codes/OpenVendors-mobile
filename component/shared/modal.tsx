import { colors } from "@/theme/colors";
import React from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

interface AppModalProps {
  visible: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ visible, onDismiss, children }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onDismiss}
    >
      {/* Background overlay */}
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Centered content */}
      <View style={styles.container}>
        {children}
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay, // semi-transparent background
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -100 }], // Adjust half width/height
    width: 300,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
