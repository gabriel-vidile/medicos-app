import React, { useState } from 'react';
import Cad from '../../components/cad/cad';
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";

const Cadastro = () => {

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
                        <Cad />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </>
    )
}



export default Cadastro;