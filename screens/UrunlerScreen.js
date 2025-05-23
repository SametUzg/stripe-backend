import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../context/CartContext';

export default function UrunlerScreen() {
  const [urunler, setUrunler] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const snapshot = await getDocs(collection(db, "urunler"));
        const urunData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUrunler(urunData);
      } catch (error) {
        console.error("❌ Ürünler alınamadı:", error);
      }
    };

    fetchUrunler();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert("🛒 Sepete Eklendi", `${item.isim} sepete eklendi.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.resim }} style={styles.image} />
      <Text style={styles.name}>{item.isim}</Text>
      <Text style={styles.price}>💰 {item.fiyat} TL</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.buttonText}>+ Sepete Ekle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖼 Tüm Ürünler</Text>
      <FlatList
        data={urunler}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Henüz ürün eklenmemiş.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  image: { width: 200, height: 150, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#333', marginBottom: 10 },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
