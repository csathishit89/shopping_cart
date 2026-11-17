import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Code from '../../constants/ColorCodes';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './updateProducts.styles';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../redux/const';
import { loggedInDetails } from '../../redux/login/login.selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  selectCategoryResponse, 
  selectCategoryResponseData, 
} from '../../redux/category/category.selectors';

import { 
  getProductDataRespReset, 
  getProductDataStart,
  saveProductNewInfoRespReset,
  saveProductNewInfoStart,
} from '../../redux/product/product.action';

import { 
  selectProductResponse, 
  selectProductResponseData,
  selectSaveProductNewInfoResponse,
  selectSaveProductNewInfoData,
} from '../../redux/product/product.selectors';
const SELECTED_ID_KEY = '@selected_category_id';

export default function UpdateProductsScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  
  // Track individual prices per product ID: { [pId]: priceString }
  const [prices, setPrices] = useState({});

  const [isLoading, setLoginSpinner] = useState(false);
  const categoryResponseData = useSelector(selectCategoryResponseData) || [];
  const [selectedProductMsg, setSelectedProductMsg] = useState('No products found');
  const productResp = useSelector(selectProductResponse);
  const productResponseData = useSelector(selectProductResponseData) || [];
  const saveProductNewInfoData = useSelector(selectSaveProductNewInfoData);
  const saveProductNewInfoResponse = useSelector(selectSaveProductNewInfoResponse) || [];
  
  useEffect(() => {
    const getProductData = {
      shopID: userRecord.ShopID || 1,
      databaseName: 'General',
      categoryID: ''
    };
    dispatch(getProductDataStart(getProductData));
  }, [getProductDataRespReset]);

  useEffect(() => {
    const loadStoredCategory = async () => {
      try {
        const storedId = await AsyncStorage.getItem(SELECTED_ID_KEY);
        if (storedId !== null && categoryResponseData.length > 0) {
          const matchedCategory = categoryResponseData.find(
            (cat) => String(cat.CategoryID) === String(storedId)
          );

          if (matchedCategory) {
            setSelectedCategory(matchedCategory.CategoryName);
          }
        }
      } catch (error) {
        console.error('Failed to load stored category from storage', error);
      }
    };

    loadStoredCategory();

    if(saveProductNewInfoResponse !== null){ 
      if(saveProductNewInfoResponse.statusCode=='01'){
        const getProductData = {
          shopID: userRecord.ShopID || 1,
          databaseName: 'General',
          categoryID: ''
        };
        dispatch(getProductDataStart(getProductData));
        Alert.alert('Success', 'Product price saved successfully!');
      }
    } else {
      Alert.alert('Failure', 'Product price save failed!');
    }
  }, [categoryResponseData, saveProductNewInfoResponse]);

  useEffect(() => {
    if (productResp !== null) {
      setLoginSpinner(false);
      setSelectedProductMsg('');
      dispatch(getProductDataRespReset());
    }

    if (saveProductNewInfoResponse !== null) {
      setLoginSpinner(false);
      dispatch(saveProductNewInfoRespReset());
    }
  }, [productResp, saveProductNewInfoResponse]);
  
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(productResponseData)) return [];
    
    let result = productResponseData.filter((product) => {
      const categoryName = product.CategoryName || product.category || '';
      const productName = product.ProductName || product.name || '';

      const matchesCategory =
        selectedCategory === 'All' || categoryName.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
      
      const matchesSearch = productName
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => {
      const priceA = a.ProductPrice || a.price || 0;
      const priceB = b.ProductPrice || b.price || 0;
      const nameA = (a.ProductName || a.name || '').toLowerCase();
      const nameB = (b.ProductName || b.name || '').toLowerCase();

      if (sortBy === 'lowToHigh') {
        return priceA - priceB;
      } else if (sortBy === 'highToLow') {
        return priceB - priceA;
      } else if (sortBy === 'nameAZ') {
        return nameA.localeCompare(nameB);
      } else if (sortBy === 'nameZA') {
        return nameB.localeCompare(nameA);
      }
      return 0;
    });

    return result;
  }, [productResponseData, search, selectedCategory, sortBy]);

  // Handle individual price change per product
  const handlePriceChange = (pId, value) => {
    setPrices((prev) => ({
      ...prev,
      [pId]: value,
    }));
  };

  // API Call to Update Product Price in Database
  const handleUpdatePrice = async (pId, defaultPrice, item) => {
    const newPrice = prices[pId] !== undefined ? prices[pId] : String(defaultPrice);
    if (!newPrice || isNaN(newPrice)) {
      Alert.alert('Error', 'Please enter a valid price amount.');
      return;
    } else {
      const productNewInfoPayload = {
        ShopID: userRecord.ShopID,
        DatabaseName: 'General',
        ProductID: item.ProductID,
        NewMRP_Price: newPrice
      };
      setLoginSpinner(true);
      dispatch(saveProductNewInfoStart(productNewInfoPayload));
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      
      {/* Search Bar Input Option */}
      <View style={{ paddingHorizontal: 16, marginTop: 12, marginBottom: 8 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F1F3F5',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 8
        }}>
          <FontAwesome name="search" size={16} color="#868E96" style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, fontSize: 14, color: '#212529', padding: 0 }}
            placeholder="Search products..."
            placeholderTextColor="#868E96"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FontAwesome name="times-circle" size={16} color="#868E96" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sort Options Bar */}
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#495057', marginRight: 8 }}>
              Sort By:
            </Text>
            {[
              { key: 'default', label: 'Default' },
              { key: 'lowToHigh', label: 'Price: Low to High' },
              { key: 'highToLow', label: 'Price: High to Low' },
              { key: 'nameAZ', label: 'Name: A-Z' },
            ].map((item) => {
              const isSelected = sortBy === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setSortBy(item.key)}
                  style={{
                    backgroundColor: isSelected ? '#1C7ED6' : '#F1F3F5',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginRight: 6,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '600', color: isSelected ? '#FFFFFF' : '#495057' }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Products list */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.ProductID || item.id)}
        renderItem={({ item }) => {
          const pId = String(item.ProductID || item.id);
          const pName = item.ProductName || item.name;
          const pCategory = item.CategoryName || item.category;
          const defaultPrice = item.ProductPrice || item.price || 0;
          const pImage = item.ProductImage || item.image;
          const pUnit = item.ProductQuantityText || item.unit || '';
          
          // Get specific price for THIS product ID or fallback to default price
          const currentInputPrice = prices[pId] !== undefined ? prices[pId] : String(defaultPrice);
              
          return (
            <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 12,
                marginHorizontal: 16,
                marginVertical: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View 
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#F8F9FA',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: pImage && pImage !== '' ? `${API_URL}${pImage}` : 'http://shop.hindustancreation.in/images/aavin-img.png' }}
                  style={{ width: 70, height: 70 }}
                />
              </View>

              <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, fontWeight: '600', color: '#868E96', textTransform: 'uppercase', marginBottom: 2 }}>
                  {pCategory}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#212529', marginBottom: 2 }} numberOfLines={1}>
                  {pName}
                </Text>
                <Text style={{ fontSize: 12, color: '#868E96', marginBottom: 8 }}>
                  Current: ₹{defaultPrice} / {pUnit}
                </Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Left Side: Currency symbol and Amount Input */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#2E7D32', marginRight: 2 }}>
                      ₹
                    </Text>
                    <TextInput
                      style={{
                        fontSize: 16,
                        fontWeight: '800',
                        color: '#2E7D32',
                        borderBottomWidth: 1,
                        borderBottomColor: '#2E7D32',
                        paddingVertical: 2,
                        paddingHorizontal: 6,
                        minWidth: 65,
                      }}
                      value={currentInputPrice}
                      onChangeText={(text) => handlePriceChange(pId, text)}
                      keyboardType="numeric"
                      placeholder="0.00"
                      placeholderTextColor="#A5D6A7"
                    />
                  </View>

                  {/* Right Side: Update Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#1C7ED6',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 6,
                    }}
                    activeOpacity={0.8}
                    onPress={() => handleUpdatePrice(pId, defaultPrice, item)}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginRight: 4 }}>
                      Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={[styles.emptyContainer, { marginTop: 60 }]}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>🔍</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#495057' }}>{selectedProductMsg}</Text>
            {selectedProductMsg == 'No products found' ? <Text style={{ fontSize: 13, color: '#868E96', marginTop: 4 }}>
              Try another product name or category.
            </Text> : ''}
          </View>
        }
      />

      <Spinner
        visible={isLoading}
        textContent="Loading..."
        textStyle={styles.loadingText}
        color={Code.primary_medium}
        animation="slide"
      />
    </SafeAreaView>
  );
}