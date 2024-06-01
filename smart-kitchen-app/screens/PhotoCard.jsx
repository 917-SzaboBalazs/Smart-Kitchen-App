import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/colors';
import { addProduct } from '../service/ProductService';
import { ProductContext } from '../Context';
import { auth } from '../firebase';

const PhotoCard = ({route, navigation}) => {

    const { photo, label } = route.params;
    const [products, setProducts] = useContext(ProductContext);
    const user = auth.currentUser.email;

    const handleAddInventory = async () => {

        try {
            const res = await addProduct(photo, label, user);

            if (res) {
                setProducts(products.map(product => {
                    if (product.label === label) {
                        return {
                            label: product.label,
                            count: product.count + 1
                        }
                    }
                    else {
                        return product;
                    }
                }));
            }

            navigation.goBack();
        }
        catch (error) {
            console.error("Error adding product to inventory: ", error);
        }
    }

    const handleReject = () => {

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Smart Kitchen App</Text>
            <Text style={styles.subTitle}>Do you want to add this product?</Text>

            <View style={styles.photoCard}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <Text style={styles.label}>{label}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleAddInventory}>
                    <Text style={styles.buttonText}>Add to Inventory</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={handleReject}>
                    <Text style={styles.buttonText}>Reject</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoCard: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 300,
        height: 300
    },
    photo: {
        width: '100%',
        height: '100%',
        
        borderRadius: 10,
        marginBottom: 10,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 32,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: colors.secondary,
        width: 150,
        height: 60,
        justifyContent: 'center',
        marginRight: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subTitle: {
        fontSize: 20,
        color: colors.primary,
        marginTop: 16,
    },
});

export default PhotoCard;