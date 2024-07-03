import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import DetailsScreen from './screens/DetailsScreen';
import Toast from 'react-native-toast-message';
import PhotoCard from './screens/PhotoCard';
import { ProductProvider } from './context';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <NavigationContainer>
        <ProductProvider>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="PhotoCard" component={PhotoCard} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </ProductProvider>
      </NavigationContainer>

      <Toast 
        topOffset={50}
      />
    </>
  );
}
