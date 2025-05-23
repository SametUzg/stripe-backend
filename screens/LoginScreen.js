import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Giriş başarılı");
      navigation.navigate('Home'); // girişten sonra ana sayfaya yönlendir
    } catch (error) {
      console.error("❌ Giriş hatası:", error.message);
      Alert.alert("Giriş başarısız", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>🔐 Giriş Yap</Text>
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Button title="Kayıt Sayfası" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
