import React, { useState } from "react";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import NewsCard from "./NewsCard";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  updateFormContent,
  updateFormTitle,
  updateSlug,
} from "../features/updateFormSlice";
import { getAuthToken } from "../utils/asyncStorage";

export default function LeftMenu({ data, setPopupVisible, setCurrentSlug }) {
  const [visible, setVisible] = useState(false);
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUpdate = async (routing, title, desc, slug) => {
    const usertoken = await getAuthToken();
    // const usertoken = state.usertoken;
    console.log(usertoken, "updatee");
    if (usertoken) {
      routing.replace("/(app)/(root)/newsAction/update/update");
      setVisible(false);
      dispatch(updateFormTitle(title));
      dispatch(updateFormContent(desc));
      dispatch(updateSlug(slug));
    } else {
      setVisible(false);
      Toast.show({
        visibilityTime: 2000,
        type: "info",
        text1: "Info",
        text2: "Need to Login to do this action!",
      });
    }
  };

  const handleDelete = async (slug) => {
    // const usertoken = state.usertoken;
    const usertoken = await getAuthToken();
    if (usertoken) {
      setCurrentSlug(slug);
      setVisible(false);
      setPopupVisible(true);
    } else {
      setVisible(false);
      Toast.show({
        visibilityTime: 2000,
        type: "info",
        text1: "Info",
        text2: "Need to Login to do this action!",
      });
    }
  };

  const hideMenu = () => {
    setVisible(false);
  };

  const showMenu = () => setVisible(true);

  return (
    <Menu
      visible={visible}
      anchor={<NewsCard data={data} onPress={showMenu} />}
      onRequestClose={hideMenu}
    >
      <MenuItem
        onPress={() =>
          handleUpdate(router, data.title, data.content, data.slug)
        }
      >
        Update
      </MenuItem>
      <MenuDivider />
      <MenuItem onPress={() => handleDelete(data.slug)}>Delete</MenuItem>
    </Menu>
  );
}
