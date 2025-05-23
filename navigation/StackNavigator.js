import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RandevuScreen from '../screens/RandevuScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SepetScreen from '../screens/SepetScreen';
import SiparisGecmisiScreen from '../screens/SiparisGecmisiScreen';
import ProfilScreen from '../screens/ProfilScreen';
import OdemeScreen from '../screens/OdemeScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Randevu" component={RandevuScreen} />
      <Stack.Screen name="Admin" component={AdminPanelScreen} />
      <Stack.Screen name="Sepet" component={SepetScreen} />
      <Stack.Screen name="SiparisGecmisi" component={SiparisGecmisiScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Odeme" component={OdemeScreen} />
    </Stack.Navigator>
  );
}
