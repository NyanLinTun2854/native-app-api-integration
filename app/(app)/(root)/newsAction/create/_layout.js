import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HOME_PAGE } from "../../../../../configs/route";

const Layout = () => {
  const router = useRouter();
  const routingFunc = () => {
    router.replace(HOME_PAGE);
  };
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          title: "",
          headerLeft: () => (
            <Pressable onPress={routingFunc}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={40}
                style={{ color: "black" }}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
