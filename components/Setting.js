import React, { useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { storeAuthToken } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import { updateAuthToken, updateUserName } from "../features/userSlice";

export default function Setting() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const hideMenu = () => {
    setVisible(false);
  };

  const showMenu = () => setVisible(true);

  const handleLogin = () => {
    router.replace("/(app)/(root)/auth/login/login");
  };

  const handleLogout = async () => {
    hideMenu();

    await storeAuthToken("AUTH_TOKEN", "");
    await storeAuthToken("USER_NAME", "");
    dispatch(updateAuthToken(""));
    dispatch(updateUserName(""));
    Toast.show({
      visibilityTime: 2000,
      type: "success",
      text1: "Success",
      text2: "Logout successfull",
    });
  };

  return (
    <Menu
      visible={visible}
      anchor={
        <Pressable onPress={showMenu}>
          <MaterialCommunityIcons
            name="cog"
            size={40}
            style={{ color: "gray" }}
          />
        </Pressable>
      }
      onRequestClose={hideMenu}
    >
      <MenuItem onPress={handleLogin}>LOGIN / SIGNUP</MenuItem>
      <MenuDivider />
      <MenuItem onPress={handleLogout}>LOGOUT</MenuItem>
      {/* <MenuDivider /> */}
    </Menu>
  );
}
