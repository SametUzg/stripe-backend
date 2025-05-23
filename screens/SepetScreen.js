import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { db, auth } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SepetScreen() {
  const { cart, clearCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const toplam = cart.reduce((acc, item) => acc + item.fiyat, 0);
    setTotal(toplam);
  }, [cart]);

  const handleSiparis = async () => {
    if (cart.length === 0) {
      Alert.alert("Sepet boş", "Lütfen önce ürün ekleyin.");
      return;
    }

    try {
      const user = auth.currentUser;

      const siparis = {
        uid: user ? user.uid : null,
        urunler: cart,
        toplam: total,
        tarih: serverTimestamp()
      };

      await addDoc(collection(db, "siparisler"), siparis);

      Alert.alert("✅ Sipariş Alındı", `Toplam: ${total} TL`);
      clearCart();
    } catch (err) {
      console.error("❌ Sipariş hatası:", err);
      Alert.alert("Hata", "Sipariş kaydedilemedi.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.isim}</Text>
      <Text style={styles.price}>💰 {item.fiyat} TL</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Sepetiniz</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Text style={styles.total}>Toplam: {total} TL</Text>
      <Button title="📦 Siparişi Onayla" onPress={handleSiparis} />
      <Button title="🧹 Sepeti Temizle" onPress={clearCart} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: { marginBottom: 10 },
  name: { fontSize: 16 },
  price: { fontSize: 16, color: '#333' },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 20 }
});
