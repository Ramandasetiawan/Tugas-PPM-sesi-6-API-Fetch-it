// src/components/FoodCard.tsx

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Food } from '../types/Food';

type FoodCardProps = {
  food: Food;
  onPress?: (food: Food) => void;
};

const FoodCard = ({ food, onPress }: FoodCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress && onPress(food)}
    >
      <Image 
        source={{ uri: food.image }} 
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.origin}>{food.origin}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3, // Bayangan untuk Android
    shadowColor: '#000', // Bayangan untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  origin: {
    fontSize: 14,
    color: '#555',
  },
});

export default FoodCard;