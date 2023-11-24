import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../api/supabase';
import { Stack, useRouter } from "expo-router";
import { useAppContext } from '../../appContext/appContext';

const Cad = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const { updateUser } = useAppContext();

    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);

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

    const handleCadastro = async () => {
        try {
            // Lógica de cadastro aqui
            const user = {
                user_full_name: name,
                user_photo: image,
                user_name: username,
                user_password: password,
            };

            // Realiza a requisição de cadastro no Supabase
            const response = await supabase.from('users').upsert([user]);

            // Verifica se o cadastro foi bem-sucedido
            if (response.error) {
                console.error('Erro ao cadastrar usuário no Supabase:', response.error);
            } else {
                console.log('Usuário cadastrado com sucesso no Supabase:', response.data);
                // Limpa os campos após o cadastro bem-sucedido
                updateUser(user)
                router.push('/home')


            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message);
            router.push('/home')
            // Adicione lógica adicional para lidar com erros
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cadastro</Text>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Pressable style={styles.button} onPress={pickImage}>
                <Text style={styles.text}>Escolher Imagem</Text>
            </Pressable>
            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />


            <Pressable style={styles.buttonSecondary} onPress={handleCadastro}>
                <Text style={styles.textSecondary}>Cadastrar</Text>
            </Pressable>
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


export default Cad;