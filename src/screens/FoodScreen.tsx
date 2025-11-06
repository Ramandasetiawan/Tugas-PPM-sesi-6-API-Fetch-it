import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getFoods } from '../api/foodApi';
import FoodCard from '../components/FoodCard';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Food } from '../types/Food';

type FoodScreenProps = NativeStackScreenProps<RootStackParamList, 'FoodList'>;

const FoodScreen = ({ navigation }: FoodScreenProps) => {
  // State untuk menyimpan data makanan
  const [foods, setFoods] = useState<Food[]>([]);
  // State untuk status loading
  const [isLoading, setIsLoading] = useState(true);
  // State untuk pesan error
  const [error, setError] = useState<string | null>(null);

  // useEffect untuk mengambil data saat komponen pertama kali dirender
  useEffect(() => {
    const loadFoods = async () => {
      try {
        setIsLoading(true); // Mulai loading
        const data = await getFoods();
        setFoods(data);
        setError(null); // Hapus error jika sukses
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data makanan.');
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    loadFoods();
  }, []); // [] berarti efek ini hanya berjalan sekali (saat mount)

  // Fungsi untuk menangani klik pada item makanan
  const handleFoodPress = (food: Food) => {
    // Navigasi ke layar FoodDetail dan kirim data 'food'
    navigation.navigate('FoodDetail', { food: food });
  };

  const renderItem = ({ item }: { item: Food }) => (
    <FoodCard 
      food={item} 
      onPress={(food) => navigation.navigate('FoodDetail', { food })}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Memuat data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default FoodScreen;