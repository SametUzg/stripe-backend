import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Kayıt başarılı");
      navigation.navigate('Login');
    } catch (error) {
      console.error("❌ Kayıt hatası:", error.message);
      Alert.alert("Kayıt başarısız", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>📝 Kayıt Ol</Text>
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
      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
}
