import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-web';
import colors from '../constants/colors';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }) => {

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("Home");
            })
            .catch((error) => {
                const errorMessage = error.message;
                //alert(errorMessage);

                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errorMessage,
                });
            });
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Smart Kitchen App</Text>

            {auth.currentUser &&
                <>
                    <Text style={styles.welcome}>
                        Welcome,
                    </Text>
                    <Text style={styles.userEmail}>
                        {auth.currentUser.email}
                    </Text>
                </>
            }

            <View style={styles.buttonContainer}>
                {auth.currentUser ? 
                    <>
                         <Pressable style={styles.button} onPress={handleLogOut}>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <Pressable style={styles.button} onPress={() => navigation.push('Login')}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => navigation.push('Signup')}>Sign Up</Text>
                        </Pressable>
                    </>
                }

                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
    },
    welcome: {
        fontSize: 20,
        color: colors.primary,
        marginTop: 16,
    },
    userEmail: {
        fontSize: 20,
        color: colors.secondary,
        marginHorizontal: 32,
    },
    buttonContainer: {
        marginTop: 32,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: colors.secondary,
        width: 100,
        height: 40,
        justifyContent: 'center',
        marginRight: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default HomeScreen;