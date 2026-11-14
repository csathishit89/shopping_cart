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
  Modal,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../constants/ColorCodes';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './products.styles';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../redux/const';
import { loggedInDetails } from '../../redux/login/login.selectors';
import { 
  selectCategoryResponse, 
  selectCategoryResponseData, 
} from '../../redux/category/category.selectors';

import { 
  getProductDataRespReset, 
  getProductDataStart
} from '../../redux/product/product.action';

import { 
  selectProductResponse, 
  selectProductResponseData, 
} from '../../redux/product/product.selectors';

const STORAGE_KEY = '@cart_storage_key';

export default function ProductsScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};

  // Check if the user is an Admin (adjust condition based on your actual userType field value, e.g., '1', 'Admin', etc.)
  const isAdminUser = String(userRecord.UserType || userRecord.userType || '').toLowerCase() === 'admin' || String(userRecord.Role || '') === '1';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [cart, setCart] = useState({}); 
  const [isCartView, setIsCartView] = useState(false);
  const [isLoading, setLoginSpinner] = useState(false);
  const [selectedProductMsg, setSelectedProductMsg] = useState('No products found');

  // Admin Customer Input Modal States
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [customerPhoneInput, setCustomerPhoneInput] = useState('');

  const categoryResponseData = useSelector(selectCategoryResponseData) || [];
  const productResp = useSelector(selectProductResponse);
  const productResponseData = useSelector(selectProductResponseData) || [];
  const SELECTED_ID_KEY = '@selected_category_id';
  
  useEffect(() => {
    const fetchStoredId = async () => {
      try {
        dispatch(getProductDataRespReset());
        const value = await AsyncStorage.getItem(SELECTED_ID_KEY);
        setLoginSpinner(true);
        setSelectedProductMsg('Loading Products');
        if (value !== null) {
          const getProductData = {
            shopID: userRecord.ShopID || 1,
            databaseName: 'General',
            categoryID: value
          };
          dispatch(getProductDataStart(getProductData));
          await AsyncStorage.removeItem(SELECTED_ID_KEY);
        } else {
          const getProductData = {
            shopID: userRecord.ShopID || 1,
            databaseName: 'General',
            categoryID: ''
          };
          dispatch(getProductDataStart(getProductData));
        }
      } catch (error) {
        console.error('Failed to load ID from storage', error);
      }
    };

    fetchStoredId(); 
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
  }, [categoryResponseData]);
  
  useEffect(() => {
    if (productResp !== null) {
      setLoginSpinner(false);
      setSelectedProductMsg('');
      dispatch(getProductDataRespReset());
    }
  }, [productResp]);
  
  // Load saved cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
      }
    };
    saveCart();
  }, [cart]);

  // Combined filtering (Category & Search) & Sorting
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

  const cartCount = Object.values(cart).reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const cartTotal = useMemo(() => {
    return Object.values(cart).reduce((total, item) => {
      const pPrice = item.product?.ProductPrice || item.product?.price || 0;
      return total + pPrice * (item.quantity || 0);
    }, 0);
  }, [cart]);

  const cartItemsList = useMemo(() => {
    return Object.values(cart).map((item) => item.product).filter(Boolean);
  }, [cart]);

  const increaseQuantity = (product) => {
    const pId = product.ProductID || product.id;
    setCart((previous) => {
      const currentEntry = previous[pId] || { quantity: 0, product };
      return {
        ...previous,
        [pId]: {
          quantity: currentEntry.quantity + 1,
          product: product,
        },
      };
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((previous) => {
      const currentEntry = previous[productId];
      if (!currentEntry) return previous;

      if (currentEntry.quantity <= 1) {
        const updated = { ...previous };
        delete updated[productId];
        return updated;
      }
      return {
        ...previous,
        [productId]: {
          ...currentEntry,
          quantity: currentEntry.quantity - 1,
        },
      };
    });
  };

  // Handles actual placement execution after getting customer info
  const executeOrderSubmission = async (customerName, customerPhone) => {
    try {
      const itemsPayload = Object.values(cart).map((item) => ({
        ProductID: item.product.ProductID || item.product.id,
        Quantity: item.quantity,
        Amount: (item.product.ProductPrice || item.product.price || 0) * item.quantity,
      }));

      const orderPayload = {
        ShopID: userRecord.ShopID || 1,
        DatabaseName: 'General',
        CustomerName: customerName,
        CustomerPhoneNumber: customerPhone,
        InvoiceTotalAmount: cartTotal,
        CreatedBy: userRecord.UserID || userRecord.userID || 0,
        Items: itemsPayload,
      };

      console.log('Submitting Order Payload:', orderPayload);
      
      // TODO: Dispatch your Redux action for order placement here, e.g.:
      // dispatch(createOrderStart(orderPayload));

      Alert.alert('Success', 'Order placed successfully!', [
        { 
          text: 'OK', 
          onPress: async () => {
            setCart({});
            await AsyncStorage.removeItem(STORAGE_KEY);
            setIsCartView(false);
          } 
        }
      ]);
    } catch (error) {
      console.error('Order placement failed', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  const handlePlaceOrderClick = () => {
    if (Object.keys(cart).length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart before placing an order.');
      return;
    }

    if (isAdminUser) {
      // If userType is admin, prompt for customer name & phone number
      setCustomerNameInput('');
      setCustomerPhoneInput('');
      setIsCustomerModalVisible(true);
    } else {
      // If regular customer login, directly fetch details from login response
      const customerName = userRecord.UserName || 'Customer';
      const customerPhone = userRecord.UserPhoneNumber || '';
      executeOrderSubmission(customerName, customerPhone);
    }
  };

  const handleAdminModalSubmit = () => {
    if (!customerNameInput.trim() || !customerPhoneInput.trim()) {
      Alert.alert('Validation Error', 'Please enter both Customer Name and Phone Number.');
      return;
    }
    setIsCustomerModalVisible(false);
    executeOrderSubmission(customerNameInput.trim(), customerPhoneInput.trim());
  };

  // Cart Page View
  if (isCartView) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
        {/* Cart Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingVertical: 14, 
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
          position: 'relative' 
        }}>
          <TouchableOpacity 
            onPress={() => setIsCartView(false)}
            activeOpacity={0.7}
            style={{ position: 'absolute', left: 16, zIndex: 1, padding: 4 }}
          >
            <FontAwesome name="arrow-left" size={20} color="#1C7ED6" />
          </TouchableOpacity>

          <Text style={styles.sectionViewCartTitle}>View Cart</Text>
        </View>

        {/* Cart Items List */}
        <FlatList
          data={cartItemsList}
          keyExtractor={(item) => String(item.ProductID || item.id)}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const pId = item.ProductID || item.id;
            const pName = item.ProductName || item.name;
            const pCategory = item.CategoryName || item.category;
            const pPrice = item.ProductPrice || item.price || 0;
            const pImage = item.ProductImage || item.image;
            const pUnit = item.ProductQuantityText || item.unit || '';

            const qty = cart[pId]?.quantity || 0;
            const itemTotalPrice = pPrice * qty;
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
                    resizeMode="cover"
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: '#868E96', textTransform: 'uppercase', marginBottom: 2 }}>
                    {pCategory}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#212529', marginBottom: 2 }} numberOfLines={1}>
                    {pName}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#868E96', marginRight: 8 }}>
                      {pUnit}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#495057', fontWeight: '600' }}>
                      (₹{pPrice} / {pUnit})
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#2E7D32' }}>
                      ₹{itemTotalPrice}
                    </Text>

                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      backgroundColor: '#F1F8E9', 
                      borderRadius: 6, 
                      borderWidth: 1, 
                      borderColor: '#C8E6C9',
                      paddingHorizontal: 4,
                      paddingVertical: 2
                    }}>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                        onPress={() => decreaseQuantity(pId)}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2E7D32' }}>−</Text>
                      </TouchableOpacity>

                      <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 6, color: '#2E7D32' }}>
                        {qty}
                      </Text>

                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                        onPress={() => increaseQuantity(item)}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2E7D32' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* Bottom Checkout Section */}
        <View style={styles.bottomCart}>
          <View>
            <Text style={styles.bottomCartItems}>Grand Total ({cartCount})</Text>
            <Text style={styles.bottomCartPrice}>₹{cartTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewCartButton}
            activeOpacity={0.8}
            onPress={handlePlaceOrderClick}
          >
            <Text style={styles.viewCartText}>Place Order →</Text>
          </TouchableOpacity>
        </View>

        {/* Admin Customer Input Modal */}
        <Modal
          visible={isCustomerModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsCustomerModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#212529', marginBottom: 16, textAlign: 'center' }}>
                Customer Details
              </Text>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#495057', marginBottom: 6 }}>Customer Name</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: '#CED4DA', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 14, color: '#212529' }}
                placeholder="Enter customer name"
                placeholderTextColor="#ADB5BD"
                value={customerNameInput}
                onChangeText={setCustomerNameInput}
              />

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#495057', marginBottom: 6 }}>Phone Number</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: '#CED4DA', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 20, color: '#212529' }}
                placeholder="Enter phone number"
                placeholderTextColor="#ADB5BD"
                keyboardType="phone-pad"
                value={customerPhoneInput}
                onChangeText={setCustomerPhoneInput}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: '#F1F3F5', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginRight: 8 }}
                  onPress={() => setIsCustomerModalVisible(false)}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#495057' }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: Code.primary || '#1C7ED6', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginLeft: 8 }}
                  onPress={handleAdminModalSubmit}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
  }

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
        renderItem={({ item }) => {
          const pId = item.ProductID || item.id;
          const pName = item.ProductName || item.name;
          const pCategory = item.CategoryName || item.category;
          const pPrice = item.ProductPrice || item.price || 0;
          const pImage = item.ProductImage || item.image;
          const pUnit = item.ProductQuantityText || item.unit || '';

          const quantity = cart[pId]?.quantity || 0;

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
                  {pUnit}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#2E7D32' }}>
                    ₹{pPrice}
                  </Text>

                  {quantity === 0 ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#1C7ED6',
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => increaseQuantity(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 13 }}>+ Add</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      backgroundColor: '#F1F8E9', 
                      borderRadius: 6, 
                      borderWidth: 1, 
                      borderColor: '#C8E6C9',
                      paddingHorizontal: 4,
                      paddingVertical: 2
                    }}>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                        onPress={() => decreaseQuantity(pId)}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1C7ED6' }}>−</Text>
                      </TouchableOpacity>

                      <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 6, color: '#1C7ED6' }}>
                        {quantity}
                      </Text>

                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                        onPress={() => increaseQuantity(item)}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1C7ED6' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => String(item.ProductID || item.id)}
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

      {/* Bottom cart summary banner */}
      {cartCount > 0 && (
        <View style={styles.bottomCart}>
          <View>
            <Text style={styles.bottomCartItems}>
              {cartCount} item{cartCount !== 1 ? 's' : ''} added
            </Text>
            <Text style={styles.bottomCartPrice}>₹{cartTotal.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.viewCartButton}
            activeOpacity={0.8}
            onPress={() => setIsCartView(true)}
          >
            <Text style={styles.viewCartText}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}

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