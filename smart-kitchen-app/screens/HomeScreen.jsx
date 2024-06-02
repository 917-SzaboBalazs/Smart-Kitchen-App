import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import colors from '../constants/colors';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import { countProductsByUserGroupByLabel } from '../service/ProductService';
import { ProductContext } from '../Context';
import { SafeAreaView } from 'react-native-safe-area-context';

const productImages = {
    milk: require('../images/milk.png'),
    butter: require('../images/butter.png'),
    cheese: require('../images/cheese.png'),
    "cottage cheese": require('../images/cottage cheese.png'),
    cream: require('../images/cream.png'),
    "ice cream": require('../images/ice cream.png'),
    sourcream: require('../images/sourcream.png'),
    kefir: require('../images/kefir.png'),
}

const HomeScreen = ({ navigation }) => {

    const [products, setProducts] = useContext(ProductContext)
    const [isLoading, setIsLoading] = useState(false);
    const user = auth.currentUser?.email;

    useEffect(() => {

        if (!auth.currentUser) {
            return;
        }

        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        const productList = await countProductsByUserGroupByLabel(user);
        setProducts(productList);
        setIsLoading(false);
    }

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

    const handleTakeImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (result.canceled) {
            return;
        }

        const image = result.assets[0].uri;
        const formData = new FormData();

        try{
            const resizedImage = await ImageManipulator.manipulateAsync(
                image,
                [{ resize: { width: 500 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            )

            formData.append('image', {
                uri: resizedImage.uri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            sendImage(formData, resizedImage.uri);
        }
        catch (error) {
            console.error(error);
        }
    }

    const sendImage = async (formData, image) => {
        try {
            const response = await axios.post('https://smart-kitchen-api.mooo.com/api/predict_dairy_product/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        
            navigation.push('PhotoCard', {photo: image, label: response.data.predicted_label});
        } catch (error) {
            console.error(error);
        }
    }
    
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
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
                        <Pressable style={styles.button} onPress={handleTakeImage}>
                            <Text style={styles.buttonText}>Add new Product</Text>
                        </Pressable>

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

            {
                auth.currentUser &&
                <>
                    <Text style={styles.productTitle}>Your products</Text>

                    <ScrollView>
                        {products.map((product, index) => (
                            <View key={index} style={styles.productItem}>
                                <Image source={productImages[product.label]} style={{ width: 32, height: 32, marginRight: 20 }} />
                                <Text style={styles.productLabel}>{product.label}</Text>
                                <Text style={styles.productCount}>{product.count}</Text>
                            </View>
                        ))}
                    </ScrollView>  
                </>
            }
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
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
        height: 60,
        justifyContent: 'center',
        marginRight: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    productTitle: {
        fontSize: 24,
        color: colors.primary,
        marginTop: 32,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
    productLabel: {
        fontSize: 20,
        color: colors.primary,
        width: 250,
    },
    productCount: {
        fontSize: 20,
        color: colors.secondary,
    },
});

export default HomeScreen;