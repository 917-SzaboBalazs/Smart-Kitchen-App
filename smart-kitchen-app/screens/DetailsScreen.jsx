import { SafeAreaView } from "react-native-safe-area-context"
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import colors from '../constants/colors';
import { auth } from "../firebase";
import { getProductsByUserAndLabel, deleteProduct } from "../service/ProductService";
import { ProductContext } from "../Context";


const DetailsScreen = ({ route, navigation }) => {

    const label = route.params.label;
    const user = auth.currentUser.email;

    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [products, setProducts] = useContext(ProductContext);

    const count = products.find(product => product.label === label)?.count;

    useEffect(() => {
        fetchProductsByLabel();
    }, []);

    const fetchProductsByLabel = async () => {
        setIsLoading(true);
        const productList = await getProductsByUserAndLabel(user, label);
        setImages(productList);
        setIsLoading(false);
    }

    const handleRemoveItem =  async (id) => {
        try {
            await deleteProduct(id);
            setImages(images.filter(product => product.id !== id));
            setProducts(products.map(product => {
                if (product.label === label) {
                    return {
                        label: product.label,
                        count: product.count - 1
                    }
                }
                else {
                    return product;
                }
            }));
        }
        catch (error) {
            console.error("Error deleting product: ", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.appName}>Smart Kitchen App</Text>
                </Pressable>
                <Text style={styles.user}>{user}</Text>
            </View>

            <Text style={styles.title}>{label} ({count})</Text>

            {isLoading ? 
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            :
                <FlatList
                    data={images}
                    renderItem={({ item: product }) => (
                        <TouchableOpacity style={styles.product}>
                            <View style={styles.productHeader}>
                                <Text style={{ textTransform: "capitalize"}}>{product.label}</Text>
                                <Pressable onPress={() => handleRemoveItem(product.id)}>
                                    <Text style={{ color: colors.secondary, width: 20, height: 20 }}>x</Text>
                                </Pressable>
                            </View>
                            <Image source={{ uri: product.image }} style={{ width: 100, height: 100 }} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={product => product.id}
                    numColumns={2} 
            />
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16
    },
    appName: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
    user: {
        fontSize: 16,
        color: colors.secondary,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textTransform: 'capitalize',
    },
    product: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: colors.card,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
})

export default DetailsScreen;
