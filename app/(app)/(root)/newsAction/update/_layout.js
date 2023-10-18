import { Stack, useRouter } from "expo-router";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HOME_PAGE } from "../../../../../configs/route";
import { Pressable } from "react-native";

const Layout = () => {
  const router = useRouter();
  const routingFunc = () => {
    router.replace(HOME_PAGE);
  };
  return (
    <Stack>
      <Stack.Screen
        name="update"
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
