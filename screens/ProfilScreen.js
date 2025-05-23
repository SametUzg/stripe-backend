import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function ProfilScreen({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Çıkış sonrası login'e gönder
    } catch (err) {
      console.error("Çıkış hatası:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Kullanıcı Profil</Text>
      <Text style={styles.email}>📧 {user?.email}</Text>

      <View style={{ marginVertical: 20 }}>
        <Button title="🧾 Sipariş Geçmişi" onPress={() => navigation.navigate('SiparisGecmisi')} />
      </View>

      <Button title="🚪 Çıkış Yap" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  email: { fontSize: 18, marginBottom: 10 }
});
