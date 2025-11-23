import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { apiClient } from "@/services/apiClient";
import { ApiError } from "@/services/types";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const setLogin = useAuthStore((s) => s.setLogin);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Login API call
      const loginResponse = await apiClient.login({
        username: data.username.trim(),
        password: data.password.trim(),
        deviceInfo: "mobile-app",
      });

      if (!loginResponse.token) {
        throw new Error("No token received from server");
      }

      // Fetch profile after successful login
      const profileResponse = await apiClient.getProfileData({
        staffId: data.username.trim(),
      });

      // Store in zustand
      setLogin(loginResponse.token, profileResponse);

      // Navigate to main app (tabs)
      router.replace("/(tabs)");
    } catch (err) {
      let message = "Login failed. Please try again.";
      if (err instanceof ApiError) {
        message = (err.payload as any)?.reason || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      Alert.alert("Login Error", message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-4">
      <View className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg gap-4">
        <View>
          <Text className="text-2xl font-bold mb-2 text-center">
            ESCL HR App Login
          </Text>
          <Text className="text-sm text-gray-600 mb-6 text-center">
            Enter your credentials
          </Text>
        </View>
        {/* Username Field */}
        <FormControl isInvalid={!!errors.username}>
          <FormControlLabel>
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter your username"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
              </Input>
            )}
          />
          {errors.username && (
            <FormControlError>{errors.username.message}</FormControlError>
          )}
        </FormControl>

        {/* Password Field */}
        <FormControl isInvalid={!!errors.password}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  editable={!isSubmitting}
                />
              </Input>
            )}
          />
          {errors.password && (
            <FormControlError>{errors.password.message}</FormControlError>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="mt-2"
        >
          {isSubmitting ? <Spinner /> : <ButtonText>Login</ButtonText>}
        </Button>
      </View>
    </View>
  );
}
