import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Food } from '../types/Food';

export type RootStackParamList = {
  FoodList: undefined;
  FoodDetail: { food: Food };
};

import FoodDetailScreen from '../screens/FoodDetail';
import FoodScreen from '../screens/FoodScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="FoodList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="FoodList" 
          component={FoodScreen} 
          options={{ title: 'Daftar Makanan' }} 
        />
        <Stack.Screen 
          name="FoodDetail" 
          component={FoodDetailScreen}
          options={({ route }) => ({ 
            title: route.params.food.name 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;