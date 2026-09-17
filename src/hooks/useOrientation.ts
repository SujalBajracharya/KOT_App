import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { RootState } from "@/store";

export function useOrientation() {
  const orientation = useSelector(
    (state: RootState) => state.server.orientation
  );

  useEffect(() => {
    const applyOrientation = async () => {
      if (orientation === "landscape") {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
    };

    applyOrientation();
  }, [orientation]);
}