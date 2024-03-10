import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native';
import colors from '../constants/colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.pop();
                navigation.replace("Home");
                resetFields();
            })
            .catch((error) => {
                const errorMessage = error.message;

                console.log(error);


                //alert(errorMessage);

                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errorMessage,
                });
            });
    };

    const resetFields = () => {
        setEmail('');
        setPassword('');
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
            />
            <Pressable
                onPress={handleLogin}
                style={styles.loginButton}
            >
                <Text style={styles.logInText}>Log In</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 24,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: colors.secondary,
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        
    },
    loginButton: {
        width: 100,
        height: 40,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    logInText: {
        color: 'white',
    },
});

export default LoginScreen;