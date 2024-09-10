import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isStoreHydrated, setStoreHydrated] = useState(false);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await useCartStore.persist.rehydrate();
        await useCheckoutStore.persist.rehydrate();
        setStoreHydrated(true);
      } catch (e) {
        console.warn("Error hydrating cart store:", e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isStoreHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isStoreHydrated]);

  if (!loaded || !isStoreHydrated) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "WireCom",
            headerTitleAlign: "center",
            headerLeft: (props) => {
              return (
                <FontAwesome6
                  name="shekel-sign"
                  size={40}
                  color={Colors.light.primary}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Product Details",
          }}
        />
        <Stack.Screen name="cart/index" options={{ title: "Shopping Cart" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
        <Stack.Screen
          name="cart/edit-item"
          options={{
            presentation: "modal",
            title: "Edit Cart Item",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
