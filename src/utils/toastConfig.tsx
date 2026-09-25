import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText as Text } from '@/components/common/AppText';
import { Check, Info, X } from "lucide-react-native";
import type { BaseToastProps } from "react-native-toast-message";
import { useTheme } from "@/theme/ThemeContext";
import { fonts } from "@/constants";

const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <ToastContent
      type="success"
      text1={text1}
      text2={text2}
    />
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <ToastContent
      type="error"
      text1={text1}
      text2={text2}
    />
  ),

  info: ({ text1, text2 }: BaseToastProps) => (
    <ToastContent
      type="info"
      text1={text1}
      text2={text2}
    />
  ),
};

type ToastType = "success" | "error" | "info";

interface ToastContentProps {
  type: ToastType;
  text1?: string;
  text2?: string;
}

function ToastContent({
  type,
  text1,
  text2,
}: ToastContentProps) {
  const { theme } = useTheme();

  const Icon =
    type === "success"
      ? Check
      : type === "error"
        ? X
        : Info;

  const iconBackground =
    type === "success"
      ? theme.colors.statusFree
      : type === "error"
        ? theme.colors.primary
        : theme.colors.statusBill;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.text,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: iconBackground,
          },
        ]}
      >
        <Icon
          size={18}
          color={theme.colors.surface}
          strokeWidth={2.5}
        />
      </View>

      <View style={styles.content}>
        {text1 && (
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.background,
              },
            ]}
          >
            {text1}
          </Text>
        )}

        {text2 && (
          <Text
            style={[
              styles.message,
              {
                color: theme.colors.background,
              },
            ]}
          >
            {text2}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,

    elevation: 5,

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontFamily: fonts.family.bold,
  },

  message: {
    marginTop: 2,
    fontSize: 12,
  },
});

export default toastConfig;