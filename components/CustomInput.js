import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

const CustomInput = ({ title, editable, placeholder, value }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        editable={editable}
        defaultValue={value.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: { marginVertical: 10 },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  title: { color: Colors.black, fontWeight: "bold" },
});

export default CustomInput;
