import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
} from "../components";
import { useAppContext } from "../appContext/appContext";
import PopularDoctors from "../components/home/popular/PopularDoctors";


const Home = () => {
    const router = useRouter();
    const { userData } = useAppContext();
    const redirectToProfile = () => {
        router.push("/perfil")
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.background },
                    headerShadowVisible: false,

                    headerRight: () => (
                        <ScreenHeaderBtn handlePress={redirectToProfile} iconUrl={userData?.user_photo ? userData?.user_photo : images.profile} dimension='100%' />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome />
                    <PopularDoctors />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home;