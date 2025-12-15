import { View, Text, StyleSheet } from 'react-native';

export const VendorMarker = ({ label }: { label?: string }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pin} />
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
    elevation: 4,
  },
  pin: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0096FF',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 4,
  },
});
