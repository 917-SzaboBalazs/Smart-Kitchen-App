import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const productCollection = collection(db, "products");

export const getProducts = async () => {
    try {
        const products = await getDocs(productCollection);

        return products.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        
        });
    }
    catch (error) {
        throw error;
    }
}

export const getProductsByUser = async (user) => {
    try {
        const products = await getProducts();

        return products.filter(product => product.user === user);
    }
    catch (error) {
        throw error;
    }
}

export const getProductsByUserAndLabel = async (user, label) => {
    try {
        const products = await getProductsByUser(user);

        return products.filter(product => product.label === label);
    }
    catch (error) {
        throw error;
    }
}

export const countProductsByUserGroupByLabel = async (user) => {
    try {
        const products = await getProductsByUser(user);
        const labels = ["milk", "butter", "cheese", "cottage cheese", "cream", "ice cream", "sourcream", "kefir"];

        const counts = labels.map(label => {
            return {
                label: label,
                count: products.filter(product => product.label === label).length
            }
        });

        return counts;
    }
    catch (error) {
        throw error;
    }
}

export const getProduct = async (id) => {
    try {
        const products = await getProducts();

        return products.find(product => product.id === id);
    }
    catch (error) {
        throw error;
    }
}

export const addProduct = async (image, label, user) => {

    try {
        const docRef = await addDoc(productCollection, {
            "image": image,
            "label": label,
            "user": user
        })

        return docRef.id;
    }
    catch (error) {
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        await deleteDoc(doc(productCollection, id));
    }
    catch (error) {
        throw error;
    }
}
