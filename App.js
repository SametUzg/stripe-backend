import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
