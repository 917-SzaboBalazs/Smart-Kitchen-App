import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native';
import colors from '../constants/colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const handleSignUp = () => {
        if (!dataIsValid()) {
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.pop();
                resetFields();
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    const dataIsValid = () => {
        if (email === '' || password === '' || passwordAgain === '') {
            alert('Please fill in all required fields');
            return false;
        }

        if (password !== passwordAgain) {
            alert('Passwords do not match');
            return false;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return false;
        }

        return true;
    };
        
    const resetFields = () => {
        setEmail('');
        setPassword('');
        setPasswordAgain('');
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Email*"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password*"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Password again*"
                secureTextEntry
                value={passwordAgain}
                onChangeText={setPasswordAgain}
            />

            <Text style={styles.passwordHint}>
                - Password must be at least 8 characters long
            </Text>

            <Pressable
                onPress={handleSignUp}
                style={styles.signUpButton}
            >
                <Text style={styles.signUpText}>Sign Up</Text>
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
    passwordHint: {
        color: colors.primary,
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    signUpButton: {
        width: 100,
        height: 40,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    signUpText: {
        color: 'white',
    },
});

export default SignupScreen;