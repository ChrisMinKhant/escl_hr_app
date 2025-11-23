import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/auth";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    clearAuth();
    router.replace("/login");
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarButton: HapticTab,
          headerShown: true,
          headerRight: () => (
            <Pressable
              accessibilityLabel="Open menu"
              onPress={openMenu}
              style={{ paddingHorizontal: 12 }}
            >
              <IconSymbol
                size={24}
                name="line.3.horizontal"
                color={Colors[colorScheme ?? "light"].tint}
              />
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="bell.fill" color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Action Sheet Menu Start */}

      <Actionsheet isOpen={menuOpen} onClose={closeMenu}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={closeMenu}>
            <ActionsheetItemText>Settings</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={closeMenu}>
            <ActionsheetItemText>Help & Support</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleLogout}>
            <ActionsheetItemText className="text-red-600">
              Logout
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      {/* Action Sheet Menu Start */}
    </>
  );
}
