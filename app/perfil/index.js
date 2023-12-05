import React, { useState } from 'react';
import Cad from '../../components/cad/cad';
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import ProfileComponent from '../../components/perfil/perfil';
import { useAppContext } from '../../appContext/appContext';
const Perfil = () => {
    const { userData } = useAppContext();
    return (
        <>
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
                        <ProfileComponent userData={userData} />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </>
    )
}



export default Perfil;