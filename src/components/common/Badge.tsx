import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'error' | 'success';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Badge({ label, variant = 'default', style, textStyle }: BadgeProps) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: theme.colors.primary + '20',
          color: theme.colors.primary,
        };
      case 'error':
        return {
          bg: theme.colors.statusOccupied + '20',
          color: theme.colors.statusOccupied,
        };
      case 'success':
        return {
          bg: theme.colors.statusFree + '20',
          color: theme.colors.statusFree,
        };
      default:
        return {
          bg: theme.colors.border,
          color: theme.colors.textSecondary,
        };
    }
  };

  const colors = getVariantStyles();

  return (
    <View
      style={[
        globalStyles.badge,
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text style={[globalStyles.badgeText, { color: colors.color }, textStyle]}>
        {label}
      </Text>
    </View>
  );
}
