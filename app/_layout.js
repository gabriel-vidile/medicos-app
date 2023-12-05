import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AppProvider } from "../appContext/appContext";
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();
const Layout = () => {

    return (
        <AppProvider>
            <Stack />
            <Toast />

        </AppProvider>
    )


}
export default Layout;