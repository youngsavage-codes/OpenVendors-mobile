import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { colors } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/fonts';

interface CalendarProps {
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date | null; // <- pass selected date
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selectedDate: propSelectedDate }) => {
  const today = new Date();
  const maxMonthLimit = new Date(today.getFullYear(), today.getMonth() + 4, 1);

  const [months, setMonths] = useState([new Date(today.getFullYear(), today.getMonth(), 1)]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(propSelectedDate || null);
  const [currentMonth, setCurrentMonth] = useState(months[0]);

  const flatListRef = useRef<FlatList<any>>(null);

  // Sync with prop
  useEffect(() => {
    setSelectedDate(propSelectedDate || null);
  }, [propSelectedDate]);

  const generateDatesForMonth = (month: Date) => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const arr: Date[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, m, i);
      if (date >= today) arr.push(date);
    }
    return arr;
  };

  const datesArray = useMemo(() => months.flatMap(generateDatesForMonth), [months]);

  const loadNextMonth = () => {
    const lastMonth = months[months.length - 1];
    const nextMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1);
    if (nextMonth > maxMonthLimit) return;
    setMonths([...months, nextMonth]);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const firstVisible = viewableItems[0].item as Date;
      setCurrentMonth(new Date(firstVisible.getFullYear(), firstVisible.getMonth(), 1));
    }
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* Month Title */}
      <Text style={styles.monthText}>
        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Text>

      <FlatList
        ref={flatListRef}
        data={datesArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toDateString()}
        renderItem={({ item }) => {
          const isSelected = selectedDate?.toDateString() === item.toDateString();
          const dayName = item.toLocaleString('default', { weekday: 'short' });

          return (
            <TouchableOpacity
              onPress={() => handleSelectDate(item)}
              style={styles.dateContainer}
            >
              <View
                style={[
                  styles.dateCircle,
                  { backgroundColor: isSelected ? colors.primary : colors.gray100 },
                ]}
              >
                <Text
                  style={{
                    fontSize: fontSize.sm,
                    color: isSelected ? colors.background : colors.textPrimary,
                    fontFamily: fontFamily.bold,
                  }}
                >
                  {item.getDate()}
                </Text>
              </View>
              <Text style={styles.dayText}>{dayName}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        onEndReached={loadNextMonth}
        onEndReachedThreshold={0.1}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  monthText: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.medium,
    marginBottom: 10,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  dateCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  dayText: {
    marginTop: 4,
    fontSize: fontSize.xs,
    color: colors.gray400,
    fontFamily: fontFamily.medium,
  },
});
