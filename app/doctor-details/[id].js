import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { supabase } from "../../api/supabase";
import {
    ScreenHeaderBtn,
} from "../../components";


import { COLORS, icons } from "../../constants";
import { useAppContext } from "../../appContext/appContext";


const DoctorDetails = () => {
    const router = useRouter();
    const { id } = useSearchParams();
    const { userData } = useAppContext();
    const [doctorDetails, setDoctorDetails] = useState({
        doctor_id: "",
        doctor_name: "",
        doctor_role: "",
        doctor_security: "",
        doctor_picture: "",
        doctor_available_slots: [],
    });

    useEffect(() => {
        // Função para buscar dados do médico no Supabase
        const fetchDoctorDetails = async () => {
            const { data, error } = await supabase
                .from("doctors")
                .select()
                .eq("doctor_id", id) // Substitua "doctor_id" pelo nome correto da coluna
                .single();

            if (error) {
                console.error("Erro ao buscar detalhes do médico:", error.message);
                return;
            }

            setDoctorDetails(data);
        };

        fetchDoctorDetails();
    }, [id]);

    const handleSlotPress = async (day, time) => {
        try {
            // Adiciona um novo registro na tabela 'appointments'

            const { data, error } = await supabase
                .from('appointement')
                .upsert([
                    {
                        id_doctor: id,
                        id_user: userData.id, // Substitua pelo ID do usuário real
                        day: day,
                        time: time
                    }
                ]);

            if (error) {
                console.error('Erro ao criar agendamento:', error.message);
                return;
            }

            console.log('Agendamento criado com sucesso:', data);
            router.back()
        } catch (error) {
            console.error('Erro geral:', error.message);
        }
    };

    const renderAvailableSlots = () => {
        return doctorDetails.doctor_available_slots.map((slot, index) => (
            <Button
                key={index}
                mode="contained"
                style={{ margin: 5 }}
                onPress={() => handleSlotPress(slot.day, slot.time)}
            >
                {`${slot.day} - ${slot.time}`}
            </Button>
        ));
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
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),

                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Card>
                    <Card.Cover source={{ uri: doctorDetails.doctor_picture }} />
                    <Card.Content>
                        <Title>{doctorDetails.doctor_name}</Title>
                        <Paragraph>{doctorDetails.doctor_role}</Paragraph>
                        <Paragraph>CRM: {doctorDetails.doctor_security}</Paragraph>
                    </Card.Content>
                </Card>



                {/* Renderiza os botões para os horários disponíveis */}
                <Card>
                    <Card.Content>
                        <Title>Horários Disponíveis</Title>
                        {renderAvailableSlots()}
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DoctorDetails;
