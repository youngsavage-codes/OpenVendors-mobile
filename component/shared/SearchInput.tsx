import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily, fontSize } from "@/theme/fonts";

import { SearchNormal1 } from "iconsax-react-nativejs";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <SearchNormal1
        variant="Bold"
        size={18}
        color={colors.gray600}
        style={{ marginRight: 8 }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.gray400}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray100,
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    fontFamily: fontFamily.light,
  },
});
