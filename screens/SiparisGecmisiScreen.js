import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function SiparisGecmisiScreen() {
  const [siparisler, setSiparisler] = useState([]);

  useEffect(() => {
    const fetchSiparisler = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, 'siparisler'),
          where('uid', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setSiparisler(data);
      } catch (err) {
        console.error('❌ Siparişler alınamadı:', err);
      }
    };

    fetchSiparisler();
  }, []);

  const renderSiparis = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>📦 Sipariş ID: {item.id}</Text>
      {item.urunler.map((urun, index) => (
        <Text key={index}>• {urun.isim} - {urun.fiyat} TL</Text>
      ))}
      <Text style={styles.total}>Toplam: {item.toplam} TL</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧾 Sipariş Geçmişi</Text>
      <FlatList
        data={siparisler}
        keyExtractor={(item) => item.id}
        renderItem={renderSiparis}
        ListEmptyComponent={<Text>Henüz siparişiniz yok.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  total: { marginTop: 10, fontWeight: 'bold' }
});
