import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Setting from "../../../../components/Setting";
import { FONT, SIZES } from "../../../../constants/theme";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(news)"
        options={{
          headerTitle: "",
          tabBarLabel: "News",
          headerLeftContainerStyle: { paddingLeft: SIZES.medium },
          headerRightContainerStyle: { paddingRight: SIZES.medium },
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="unicorn-variant"
                size={40}
                style={{ color: "#007FFF" }}
              />
              <Text style={{ fontFamily: FONT.bold, color: "#007FFF" }}>
                Known
              </Text>
            </View>
          ),
          headerRight: () => <Setting />,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="email"
              size={size}
              style={{ color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          headerShown: false,
          tabBarLabel: "Person",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              style={{ color }}
            />
          ),
        }}
      />
      {/* <Tabs.Screen name="news" options={{ href: null }} /> */}
    </Tabs>
  );
};

export default Layout;
