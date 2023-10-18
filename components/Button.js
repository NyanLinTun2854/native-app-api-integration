import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONT } from "../constants/theme";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 55,
    backgroundColor: COLORS.main,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontFamily: FONT.bold,
    fontSize: 15,
    color: COLORS.white,
  },
});
