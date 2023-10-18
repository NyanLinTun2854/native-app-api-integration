import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";
import FontFamilys from "../../constants/Fonts";
import Toast from "react-native-toast-message";

export default function () {
  const [stateLoaded, setStateLoaded] = useState(false);
  const [fontsLoaded] = useFonts(FontFamilys);

  const onLayout = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {fontsLoaded && (
          <GestureHandlerRootView onLayout={onLayout} style={{ flex: 1 }}>
            <FlipperAsyncStorage />
            <RootLayout />
          </GestureHandlerRootView>
        )}
      </Provider>
    </SafeAreaProvider>
  );
}

function RootLayout() {
  const colorScheme = undefined;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Set the status bar style based on the color scheme */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Toast />
    </ThemeProvider>
  );
}
