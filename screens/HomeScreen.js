import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <Image source={{ uri: 'https://placekitten.com/400/300' }} style={{ width: 400, height: 300 }} />
        <Image source={{ uri: 'https://placekitten.com/401/300' }} style={{ width: 400, height: 300 }} />
      </ScrollView>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>📸 Fotoğraf Stüdyomuza Hoş Geldiniz</Text>
        <Text style={{ marginTop: 10 }}>
          En güzel kareleri sizin için yakalıyoruz. Randevu alarak hemen başlayın!
        </Text>

        <TouchableOpacity
          style={{ backgroundColor: '#000', padding: 15, borderRadius: 10, marginTop: 20 }}
          onPress={() => navigation.navigate('Randevu')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>🎯 Randevu Al</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#333', padding: 15, borderRadius: 10, marginTop: 15 }}
          onPress={() => navigation.navigate('Admin')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>🔒 Admin Paneli</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={{ backgroundColor: '#444', padding: 15, borderRadius: 10, marginTop: 15 }}
           onPress={() => navigation.navigate('Profil')}
        >
        <Text style={{ color: '#fff', textAlign: 'center' }}>👤 Profil</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ backgroundColor: '#555', padding: 15, borderRadius: 10, marginTop: 15 }}
          onPress={() => navigation.navigate('Sepet')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>🛒 Sepete Git</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
