import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { CardField, useConfirmPayment, StripeProvider } from '@stripe/stripe-react-native';

const API_URL = 'http://localhost:3000'; // 🔁 Burayı backend adresinle değiştir (Render/Glitch kullanıyorsan)

export default function OdemeScreen() {
  const [amount, setAmount] = useState(15000); // örnek: 150 TL
  const { confirmPayment, loading } = useConfirmPayment();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("❌ Backend bağlantı hatası:", err);
      }
    };

    fetchPaymentIntent();
  }, []);

  const handlePay = async () => {
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert('Ödeme Hatası', error.message);
    } else if (paymentIntent) {
      Alert.alert('✅ Ödeme Başarılı!', `İşlem No: ${paymentIntent.id}`);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51RRrXFQnMP6TtyynmPebw5gCT9SynV7FwmR5QS0GfXEJOazCE2me01dHBanpttfxYHGgyhrPp6IbaQyxJeZISoCD00E7WNa0WA">
      <View style={styles.container}>
        <Text style={styles.title}>💳 Kart ile Ödeme</Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{ number: '4242 4242 4242 4242' }}
          cardStyle={styles.card}
          style={{ height: 50, marginVertical: 30 }}
        />
        <Button title="💰 Ödemeyi Yap" onPress={handlePay} disabled={loading || !clientSecret} />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f1f1f1',
    textColor: '#000'
  }
});
