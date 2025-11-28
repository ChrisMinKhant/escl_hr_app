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
import { Pressable, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, Sizes } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useNotificationsPoll } from "@/hooks/use-notifications-poll";
import { useAuthStore, useProfile } from "@/store/auth";
import { useNotificationsStore, useUnreadCount } from "@/store/notifications";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const clearNotifications = useNotificationsStore((s) => s.reset);
  const profile = useProfile();
  const unreadCount = useUnreadCount();
  useNotificationsPoll(profile?.staffId);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    clearAuth();
    clearNotifications();
    router.replace("/login");
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors["light"].tint,
          tabBarButton: HapticTab,
          tabBarShowLabel: false,
          headerShown: true,
          tabBarStyle: {
            borderTopWidth: 0
          },
          headerStyle: {
            borderBottomWidth: 0
          },
          headerRight: () => (
            <Pressable
              accessibilityLabel="Open menu"
              onPress={openMenu}
              style={{ paddingHorizontal: 12 }}
            >
              <IconSymbol
                size={Sizes.icon}
                name="line.3.horizontal"
                color={Colors["light"].icon}
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
              <IconSymbol size={Sizes.icon} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={Sizes.icon} name="person.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color }) => (
              <View>
                <IconSymbol size={Sizes.icon} name="bell.fill" color={color} />
                {unreadCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -2,
                      right: -2,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "red",
                    }}
                  />
                )}
              </View>
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
