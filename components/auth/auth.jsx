import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from "expo-router";
import { supabase } from '../../api/supabase';
import { useAppContext } from '../../appContext/appContext';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { updateUser } = useAppContext();
    const handleLogin = async () => {
        // Lógica de autenticação aqui
        console.log(`Usuário: ${username}, Senha: ${password}`);
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_name', username)
                .eq('user_password', password);

            if (error) {
                console.error('Erro ao consultar o banco de dados:', error.message);
                return false;
            }
            if (data.length > 0) {

                updateUser(data[0]);
                router.push('/home');

            }
        } catch (error) {
            console.error('Erro na verificação do usuário:', error.message);
            return false;
        }


    };
    const handleCadastro = () => {
        router.push('/cadastro')
    };
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>Entrar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
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
                <View style={styles.flex}>
                    <Pressable style={styles.button} onPress={handleLogin} >
                        <Text style={styles.text}>Entrar</Text>
                    </Pressable>
                    <Pressable style={styles.buttonSecondary} onPress={handleCadastro} >
                        <Text style={styles.textSecondary}>Cadastrar</Text>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

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


export default Auth;