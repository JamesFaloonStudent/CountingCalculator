import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";

const appDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
     ...MD3DarkTheme.colors,
    primary: '#D0BCFF', // Standard MD3 Purple for dark mode
    secondary: '#CCC2DC',
    tertiary: '#EFB8C8',
    surface: '#1C1B1F', // Background surface
    outline: '#938F99',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={appDarkTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}


