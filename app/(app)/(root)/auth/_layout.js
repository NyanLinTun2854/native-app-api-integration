import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="login/login" options={{ headerShown: false }} />
      <Stack.Screen name="signup/signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
