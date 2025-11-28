import {
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useIsLoggedIn } from "@/store/auth";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  let colorScheme = useColorScheme();
  const isLoggedIn = useIsLoggedIn();
  const segments = useSegments();
  const router = useRouter();
  // Guard to ensure first paint completes with <Slot /> rendered before navigation
  const [layoutMounted, setLayoutMounted] = useState(false);

  // Mark mounted after initial commit
  useEffect(() => {
    setLayoutMounted(true);
  }, []);

  useEffect(() => {

    // Avoid navigating before segments are populated & layout mounted
    if (!layoutMounted) return;
    // segments is a typed tuple from expo-router; just ensure first segment exists
    if (!segments[0]) return;

    const first = segments[0];
    const inTabsGroup = first === "(tabs)";

    if (!isLoggedIn && inTabsGroup) {
      router.replace("/login");
      return;
    }

    if (isLoggedIn && first === "login") {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, segments, layoutMounted]);

  return (

    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>

  );
}
