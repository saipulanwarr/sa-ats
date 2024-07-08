import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";

const CustomSelect = ({ label, title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.content} onPress={onPress}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <View style={styles.icon}>
          <Entypo name="chevron-down" size={20} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { color: Colors.black, fontWeight: "bold", marginBottom: 10 },
  content: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  title: {
    flex: 1,
    padding: 13,
  },
  icon: { width: 30 },
});

export default CustomSelect;
