import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({ children, style, hitSlop = 4, ...props }: ButtonProps) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        globalStyles.button,
        pressed && { opacity: 0.7 },
        style,
      ]}
      hitSlop={hitSlop}
      {...props}
    >
      {children}
    </Pressable>
  );
}
