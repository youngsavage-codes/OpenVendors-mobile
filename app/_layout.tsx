import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    MonaSansBold: require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),
    MonaSansRegular: require('../assets/fonts/Raleway-Regular.ttf'),
    MonaSansMedium: require('../assets/fonts/Raleway-Medium.ttf'),
    MonaSansLight: require('../assets/fonts/Raleway-Light.ttf'),
    MonaSansExtraLight: require('../assets/fonts/Raleway-ExtraLight.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack>
      {/* Authentication stack */}
      <Stack.Screen
        name="(authentication)"
        options={{ headerShown: false }}
      />

      {/* Main tab stack */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(others)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
