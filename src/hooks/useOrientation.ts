import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export function useOrientation() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isLandscape = width > height;

    return {
      width,
      height,
      isLandscape,
      isPortrait: !isLandscape,
      orientation: isLandscape ? "landscape" : "portrait",
    };
  }, [width, height]);
}