import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export interface IconButtonProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({ children, style, hitSlop = 4, ...props }: IconButtonProps) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        globalStyles.iconButton,
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
