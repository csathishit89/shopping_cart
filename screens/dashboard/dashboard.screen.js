import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import styles from './dashboard.styles';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../redux/const';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  getCategoryDataRespReset, 
  getCategoryDataStart
} from '../../redux/category/category.action';

import { 
  selectCategoryResponse, 
  selectCategoryResponseData, 
} from '../../redux/category/category.selectors';


export default function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const categoryResp = useSelector(selectCategoryResponse);
  const categoryResponseData = useSelector(selectCategoryResponseData);

  useEffect(() => {
    const getDashData = {
      shopID:1,
      databaseName: 'General'
    };
    dispatch(getCategoryDataStart(getDashData));
  }, []);

  useEffect(() => {
    if (categoryResp !== null) {
      dispatch(getCategoryDataRespReset())
    }
  }, [categoryResp]);

  const handleCardPress = async (item) => {
      try {
          const getCategoryID = String(item.CategoryID);
          await AsyncStorage.setItem('@selected_category_id', getCategoryID);
          navigation.navigate('Products');
      } catch (error) {
          console.error('Failed to save ID to storage', error);
      }
  };

  const onStatsPress = () => {
    navigation.navigate('StatsPage');
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
    >
      <Image
        source={{ uri: `${API_URL}${item.CategoryImage}` }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.CategoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const logo_image = require('../../assets/images/aavinHomeIcon.png')
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerContainer}>
        {/* Centered Logo */}
        <Image
          source={logo_image}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Top-Right Statistics Icon */}
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={onStatsPress}
          activeOpacity={0.7}
        >
          <FontAwesome name="bar-chart" size={30} color="#1C7ED6" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={categoryResponseData}
        renderItem={renderCard}
        keyExtractor={(item) => item.CategoryID}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
