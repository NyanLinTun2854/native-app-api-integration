import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";

const FormInput = ({
  placeholder,
  icon,
  title,
  passwordType = false,
  onChange,
  value,
  onBlur,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("formInputRender", value);
  }, []);
  return (
    <View style={styles.searchContainer}>
      <View style={styles.titleWrapper}>
        <MaterialCommunityIcons
          name={icon}
          size={35}
          style={{ color: COLORS.secondary }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.searchWrapper}>
        <TextInput
          onBlur={onBlur}
          style={styles.searchInput}
          secureTextEntry={passwordType && show}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#00000033"
        />
        {passwordType && (
          <View style={styles.eyeContainer}>
            {passwordType && show ? (
              <Pressable onPress={() => setShow(false)}>
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={25}
                  style={{ color: COLORS.light }}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => setShow(true)}>
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={25}
                  style={{ color: COLORS.light }}
                />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  searchContainer: {
    width: "80%",
    height: "auto",
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  title: {
    fontFamily: FONT.regular,
    color: COLORS.black,
    fontSize: 15,
    marginStart: 5,
  },
  searchWrapper: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: SIZES.medium,
    borderWidth: 0.8,
    borderStyle: "solid",
    borderColor: "black",
    position: "relative",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  eyeContainer: { position: "absolute", top: 10, right: 15 },
});
