import React from 'react';
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

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 32 - CARD_MARGIN * 2) / 2; // 2-column grid with padding

const DASHBOARD_ITEMS = [
  { id: '1', title: 'Dairy', image: require('../../assets/images/dairy_image.png') },
  { id: '2', title: 'Ice Cream', image: require('../../assets/images/ice-cream.png') },
  { id: '3', title: 'Biscuits', image: require('../../assets/images/milkBiscuts_aavin.png') },
  { id: '4', title: 'Snacks', image: require('../../assets/images/snacks.png') },
  { id: '5', title: 'Powder', image: require('../../assets/images/badamPowder.png') },
  { id: '6', title: 'Sweets', image: require('../../assets/images/sweets.png') },
  { id: '7', title: 'Cake', image: require('../../assets/images/cake.png') },
  { id: '8', title: 'Beverages', image: require('../../assets/images/beverages.png') },
];

export default function DashboardScreen() {
  const handleCardPress = (item) => {
    // Handle navigation or action here
    console.log('Pressed card:', item.title);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
    >
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const logo_image = require('../../assets/images/login/logo.png')
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerContainer}>
        <Image
          source={logo_image}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      
      <FlatList
        data={DASHBOARD_ITEMS}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
