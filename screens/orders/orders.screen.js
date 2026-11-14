import React from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';
import styles from './orders.styles';

export default function OrdersScreen() {
   
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingVertical: 14, alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#212529' }}>Orders</Text>
      </View>
    </SafeAreaView>
  );
}
