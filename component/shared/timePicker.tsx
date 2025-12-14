import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useMemo, useEffect, useState } from 'react';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';

interface TimeMapProps {
  openingTime: string;
  closingTime: string;
  intervalMinutes?: number;
  selectedTime?: string | null; // controlled prop
  onSelectTime?: (time: string) => void;
}

const TimeMap: React.FC<TimeMapProps> = ({
  openingTime,
  closingTime,
  intervalMinutes = 30,
  selectedTime: propSelectedTime,
  onSelectTime,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(propSelectedTime || null);

  // Sync with prop
  useEffect(() => {
    setSelectedTime(propSelectedTime || null);
  }, [propSelectedTime]);

  // Generate time slots
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const [openHour, openMinute] = openingTime.split(':').map(Number);
    const [closeHour, closeMinute] = closingTime.split(':').map(Number);

    let current = new Date();
    current.setHours(openHour, openMinute, 0, 0);

    const end = new Date();
    end.setHours(closeHour, closeMinute, 0, 0);

    while (current <= end) {
      const hours = String(current.getHours()).padStart(2, '0');
      const minutes = String(current.getMinutes()).padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
      current.setMinutes(current.getMinutes() + intervalMinutes);
    }

    return slots;
  }, [openingTime, closingTime, intervalMinutes]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelectTime?.(time);
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.header}>Select Time</Text>

      <FlatList
        data={timeSlots}
        numColumns={3} // grid mode
        scrollEnabled={false}
        keyExtractor={(item) => item}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
        renderItem={({ item }) => {
          const isSelected = item === selectedTime;
          return (
            <TouchableOpacity
              onPress={() => handleSelectTime(item)}
              style={[
                styles.timeSlot,
                { backgroundColor: isSelected ? colors.primary : colors.gray100 },
              ]}
            >
              <Text
                style={{
                  fontSize: fontSize.sm,
                  color: isSelected ? colors.background : colors.textPrimary,
                  fontFamily: fontFamily.medium,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TimeMap;

const styles = StyleSheet.create({
  header: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.medium,
    marginBottom: 10,
    marginTop: 10,
    color: colors.textPrimary,
  },
  timeSlot: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
});
