import React, { useLayoutEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

// Tentukan tipe props untuk layar ini, ambil dari RootStackParamList
type FoodDetailProps = NativeStackScreenProps<RootStackParamList, 'FoodDetail'>;

const FoodDetailScreen = ({ route, navigation }: FoodDetailProps) => {
  // Ambil parameter 'food' yang dikirim dari layar sebelumnya
  const { food } = route.params;

  // Gunakan useLayoutEffect untuk mengatur judul header SEBELUM layar ditampilkan
  useLayoutEffect(() => {
    navigation.setOptions({
      title: food.name, // Atur judul header menjadi nama makanan
    });
  }, [navigation, food.name]); // Efek ini bergantung pada navigation dan food.name

  // Render komponen
  return (
    <ScrollView style={styles.container}>
      {/* 1. Gambar Utama */}
      <Image source={{ uri: food.image }} style={styles.image} />

      {/* 2. Konten Detail */}
      <View style={styles.contentContainer}>
        {/* Nama dan Asal */}
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.origin}>Asal: {food.origin}</Text>
        
        {/* Garis Pemisah */}
        <View style={styles.separator} />

        {/* Deskripsi */}
        <Text style={styles.descriptionTitle}>Deskripsi</Text>
        <Text style={styles.description}>{food.description}</Text>

        {/* Bahan-bahan */}
        <Text style={styles.bahan}>bahan-bahan: {food.ingredients}</Text>

        {/* Detail Tambahan */}
        <View style={styles.infoBox}>
          <InfoRow label="Kategori" value={food.category} />
          <InfoRow label="Bahan Utama" value={food.mainIngredient} />
          <InfoRow label="Tingkat Pedas" value={food.spiceLevel} />
        </View>
      </View>
    </ScrollView>
  );
};

// Komponen helper kecil untuk merapikan tampilan detail
const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// StyleSheet untuk layar detail
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 250, // Tentukan tinggi gambar
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bahan : {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
    fontWeight: 'bold'

  },
  origin: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24, // Spasi antar baris agar mudah dibaca
    color: '#555',
    textAlign: 'justify',
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // Beri garis pemisah antar baris info, kecuali yang terakhir
    borderBottomWidth: 2, 
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    flex: 1, // Agar label bisa fleksibel
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1.5, // Beri ruang lebih untuk value
    textAlign: 'right',
  },
});

export default FoodDetailScreen;