import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

const SearchBox = ({ onChangeSearch }) => {
  return (
    <View style={styles.content}>
      <View style={styles.input}>
        <TextInput
          placeholder="Search...."
          onChangeText={(text) => onChangeSearch(text)}
        />
      </View>
      <View style={styles.icon}>
        <AntDesign name="search1" size={20} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    marginBottom: 10,
  },
  input: { flex: 1, justifyContent: "center", marginHorizontal: 10 },
  icon: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
});

export default SearchBox;
