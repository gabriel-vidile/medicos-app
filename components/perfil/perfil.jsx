import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../api/supabase';
import { SIZES } from '../../constants';
const ProfileComponent = ({ userData }) => {
    const [userPhoto, setUserPhoto] = useState(userData?.user_photo || 'images.profile');
    const [image, setImage] = useState(null);
    const [consultas, setConsultas] = useState(null)
    useEffect(() => {
        setUserPhoto(userData?.user_photo || 'images.profile');


        const fetchConsultas = async () => {
            try {
                const { data, error } = await supabase
                    .from('appointement')
                    .select('*')
                    .eq('id_user', userData?.id);

                if (error) {
                    console.log(error);
                } else {
                    // Mapeia as consultas e busca o nome do médico para cada uma
                    const consultasComMedico = await Promise.all(
                        data.map(async (consulta) => {
                            console.log(consulta)
                            const nomeMedico = await buscarMedico(consulta.id_doctor);
                            return { ...consulta, doctor_name: nomeMedico };
                        })
                    );

                    // Agora você tem as consultas com a propriedade "doctor_name"
                    setConsultas(consultasComMedico);
                }
            } catch (error) {
                console.error('Erro ao buscar consultas:', error.message);
            }
        };

        const buscarMedico = async (item) => {
            try {
                const { data, error } = await supabase
                    .from('doctors')
                    .select('*')
                    .eq('doctor_id', item);

                if (error) {
                    console.log(error);
                } else {
                    return data[0]?.doctor_name || 'Médico não encontrado';
                }
            } catch (error) {
                console.error('Erro ao buscar médico:', error.message);
            }
        };

        fetchConsultas();


    }, [userData]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };
    function letrasAleatorias(numero) {
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let resultado = '';

        for (let i = 0; i < numero; i++) {
            const indiceAleatorio = Math.floor(Math.random() * letras.length);
            resultado += letras.charAt(indiceAleatorio);
        }

        return resultado;
    }
    const updateImage = async () => {
        try {
            if (image) {
                const fileExtension = image.split('.').pop();
                const response = await fetch(image);
                const blob = await response.blob();

                const { data, error } = await supabase.storage
                    .from('imagensCadastro')
                    .upload(`${userData.id}_${letrasAleatorias(2)}.jpg`, blob, {
                        contentType: 'image/jpeg', // Ajuste o tipo de conteúdo conforme necessário
                    });
                if (!error) {
                    const imageUrl = `https://mebdvqkicqmelyhtucat.supabase.co/storage/v1/object/public/imagensCadastro/${data.path}`;

                    const { data: updateData, error: updateError } = await supabase
                        .from('users')
                        .update({ user_photo: imageUrl })
                        .eq('id', userData.id);

                    if (!updateError) {
                        setUserPhoto(imageUrl);
                        setImage(null);
                        userData.user_photo = imageUrl;
                    } else {
                        console.error('Erro ao atualizar imagem no banco de dados', updateError);
                    }
                } else {
                    console.error('Erro ao fazer upload da imagem', error);
                }
            }
        } catch (error) {
            console.error('Erro geral', error);
        }
    };

    const renderAppointmentItem = ({ item }) => (
        <View style={{ marginLeft: 10, backgroundColor: "#fff5d6", borderRadius: 24, padding: 20, height: 170 }}>
            <Text>Médico: {item.doctor_name}</Text>
            <Text>Paciente: {userData.user_full_name}</Text>
            <Text>Data da Consulta: {item.day}</Text>
            <Text>Hora da Consulta: {item.time}</Text>
        </View>
    );

    return (
        <View style={styles.flex}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 500 }} />}
            <Pressable style={styles.button} onPress={pickImage}>
                <Text style={styles.text}>Escolher Imagem</Text>
            </Pressable>
            {image && <Pressable style={styles.buttonSecondary} onPress={updateImage}>
                <Text style={styles.textSecondary}>Atualizar imagem</Text>
            </Pressable>}
            <View style={styles.flex}>
                <Text style={styles.label}>Nome de Usuário: {userData.user_name}</Text>
                <Text style={styles.label}>Nome Completo: {userData.user_full_name}</Text>
                <Text style={styles.label}>Consultas Marcadas:</Text>
            </View>
            <FlatList
                data={consultas}
                renderItem={renderAppointmentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginRight: SIZES.medium }}
                horizontal
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginTop: 10,
        borderRadius: 16,
        marginBottom: 10,
        backgroundColor: "#FF8400",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#FFFAEB',
    },
    buttonSecondary: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        border: "3px solid #FF8400",
        marginTop: 10,
        borderRadius: 16,
        marginBottom: 10,
        backgroundColor: "#FFF5D6",
    },
    textSecondary: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#130E01',
    },
    input: {
        width: 300,
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#CF4307',
        borderRadius: 24,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
export default ProfileComponent;
