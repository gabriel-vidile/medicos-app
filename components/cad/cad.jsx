import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../api/supabase';
import { Stack, useRouter } from "expo-router";
import { useAppContext } from '../../appContext/appContext';
import * as FileSystem from 'expo-file-system';
const Cad = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const { updateUser } = useAppContext();
    const [trava, setTrava] = useState(false);
    const [password, setPassword] = useState('');
    const router = useRouter();



    const handleCadastro = async () => {
        try {
            setTrava(true);

            // Autenticação do Usuário
            const { user, error: authError } = await supabase.auth.signUp({
                email: username.toLowerCase(), // Use o e-mail como nome de usuário neste exemplo
                password,
                email_confirm: true,

            });

            if (authError) {
                console.error('Erro ao cadastrar usuário:', authError);
                setTrava(false);
                return;
            }
            const userData = {
                user_full_name: name,
                user_name: username,
                user_password: password,
            };

            const response = await supabase.from('users').upsert([userData]);

            if (response.error) {
                console.error('Erro ao cadastrar usuário no Supabase:', response.error);
                setTrava(false);
            } else {
                console.log('Usuário cadastrado com sucesso no Supabase:', response.data);
                router.push('/home');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message);
            router.push('/');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cadastro</Text>

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


            <Pressable style={styles.buttonSecondary} disabled={trava} onPress={handleCadastro}>
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