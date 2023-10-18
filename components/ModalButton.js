import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT } from "../constants/theme";

const Button = ({ color, title, onPress }) => {
  return (
    // <View style={styles.container}>
    <TouchableOpacity style={styles.button(color)} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  button: (color) => ({
    backgroundColor: color,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 100,
    height: 40, // Set the height of the button
    justifyContent: "center",
    alignItems: "center",
  }),
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: FONT.medium,
  },
});

export default Button;
