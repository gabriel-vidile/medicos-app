import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import Auth from "../components/auth/auth";


const HomePage = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.background },
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Auth />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default HomePage;