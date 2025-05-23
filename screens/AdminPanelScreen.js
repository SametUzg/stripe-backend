import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function AdminPanelScreen() {
  const [randevular, setRandevular] = useState([]);
  const [isim, setIsim] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [resim, setResim] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "randevular"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRandevular(data);
      } catch (error) {
        console.error("❌ Randevular alınamadı:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.ad}>{item.ad}</Text>
      <Text>{item.telefon}</Text>
      <Text>📅 {item.tarih}</Text>
    </View>
  );

  const handleUrunEkle = async () => {
    if (!isim || !fiyat || !resim) {
      Alert.alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const yeniUrun = { isim, fiyat: parseFloat(fiyat), resim };
      await addDoc(collection(db, "urunler"), yeniUrun);
      Alert.alert("✅ Ürün eklendi!");
      setIsim('');
      setFiyat('');
      setResim('');
    } catch (err) {
      console.error("❌ Ürün ekleme hatası:", err);
      Alert.alert("Ürün eklenemedi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Alınan Randevular</Text>
      <FlatList
        data={randevular}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Henüz randevu alınmamış.</Text>}
      />

      <View style={{ marginTop: 30 }}>
        <Text style={styles.title}>🖼 Yeni Ürün Ekle</Text>
        <TextInput
          placeholder="Ürün İsmi"
          value={isim}
          onChangeText={setIsim}
          style={styles.input}
        />
        <TextInput
          placeholder="Fiyat"
          value={fiyat}
          onChangeText={setFiyat}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Resim Linki"
          value={resim}
          onChangeText={setResim}
          style={styles.input}
        />
        <Button title="➕ Ürünü Ekle" onPress={handleUrunEkle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 15 },
  ad: { fontSize: 18, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});
