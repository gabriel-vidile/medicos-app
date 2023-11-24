import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import {
    Company,
    JobAbout,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";

const tabs = ["Especialização", "Formação", "Relatos"];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const displayTabContent = () => {
        switch (activeTab) {
            case "Formação":
                return (
                    <Specifics
                        title='Qualifications'
                    />
                );

            case "Especialização":
                return (
                    <></>
                );

            case "Relatos":
                return (
                    <Specifics
                        title='Relatos'
                    />
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.background },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
                    ),
                    headerTitle: "",
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false}

                >

                </ScrollView>

            </>
        </SafeAreaView>
    );
};

export default JobDetails;