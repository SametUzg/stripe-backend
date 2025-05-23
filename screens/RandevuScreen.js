import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useForm, Controller } from 'react-hook-form';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';


export default function RandevuScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { control, handleSubmit, reset } = useForm();

const onSubmit = async data => {
  console.log("📩 Form submit edildi");
  if (!selectedDate) {
    Alert.alert("Tarih Seçimi Gerekli", "Lütfen bir randevu tarihi seçin.");
    return;
  }

  try {
    const randevu = {
      ad: data.ad,
      telefon: data.telefon,
      tarih: selectedDate,
      createdAt: new Date().toISOString()
    };

    console.log("🛠 Randevu hazırlanıyor:", randevu);

    await addDoc(collection(db, "randevular"), randevu);

    console.log("✅ Firestore'a başarıyla gönderildi");
    Alert.alert("✅ Randevunuz alındı!");
    reset();
    setSelectedDate(null);
  } catch (error) {
    console.error("❌ Firebase Hatası:", error);
    Alert.alert("Hata", "Randevu kaydedilemedi.");
  }
};

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>📆 Randevu Tarihi Seçin:</Text>

      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: 'black',
          },
        }}
      />

      <Text style={{ fontSize: 20, marginVertical: 10 }}>📝 Bilgilerinizi Girin:</Text>

      <Controller
        control={control}
        name="ad"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Ad Soyad"
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
          />
        )}
      />

      <Controller
        control={control}
        name="telefon"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Telefon Numarası"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
          />
        )}
      />

      <Button title="🎯 Randevu Al" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}