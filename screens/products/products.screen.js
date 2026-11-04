import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './products.styles';

const STORAGE_KEY = '@cart_storage_key';

const PRODUCTS = [
  {
    id: '1',
    name: 'Full Cream Milk',
    category: 'Milk',
    price: 35,
    unit: '500 ml',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Fresh Curd',
    category: 'Curd',
    price: 30,
    unit: '500 g',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Pure Ghee',
    category: 'Ghee',
    price: 180,
    unit: '200 ml',
    image:
      'https://images.unsplash.com/photo-1638111539917-7c13d7c9c5b4?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Fresh Butter',
    category: 'Butter',
    price: 58,
    unit: '100 g',
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Paneer',
    category: 'Paneer',
    price: 95,
    unit: '200 g',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Fresh Milk',
    category: 'Milk',
    price: 22,
    unit: '250 ml',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
  },
];

const CATEGORIES = [
  'All',
  'Dairy',
  'Ice Cream',
  'Biscuts',
  'Snacks',
  'Powder',
  'Sweets',
  'Cake',
  'Beverages',
];

export default function ProductsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [isCartView, setIsCartView] = useState(false);

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

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = PRODUCTS.reduce((total, product) => {
    return total + product.price * (cart[product.id] || 0);
  }, 0);

  const cartItemsList = useMemo(() => {
    return PRODUCTS.filter((product) => (cart[product.id] || 0) > 0);
  }, [cart]);

  const increaseQuantity = (productId) => {
    setCart((previous) => ({
      ...previous,
      [productId]: (previous[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setCart((previous) => {
      const currentQty = previous[productId] || 0;
      if (currentQty <= 1) {
        const updated = { ...previous };
        delete updated[productId];
        return updated;
      }
      return {
        ...previous,
        [productId]: currentQty - 1,
      };
    });
  };

  const placeOrder = async () => {
    Alert.alert(
      'Order Placed Successfully! 🎉',
      `Total Paid: ₹${cartTotal.toFixed(2)}\nThank you for your order.`,
      [
        {
          text: 'OK',
          onPress: async () => {
            setCart({});
            await AsyncStorage.removeItem(STORAGE_KEY);
            setIsCartView(false);
          },
        },
      ]
    );
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
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const qty = cart[item.id] || 0;
            const itemTotalPrice = item.price * qty;

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
                {/* Product image thumbnail */}
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
                    source={{ uri: item.image }}
                    style={{ width: 70, height: 70 }}
                    resizeMode="cover"
                  />
                </View>

                {/* Product details */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: '#868E96', textTransform: 'uppercase', marginBottom: 2 }}>
                    {item.category}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#212529', marginBottom: 2 }} numberOfLines={1}>
                    {item.name}
                  </Text>
                  
                  {/* Unit & 1 Unit Price Display */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#868E96', marginRight: 8 }}>
                      {item.unit}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#495057', fontWeight: '600' }}>
                      (₹{item.price} / {item.unit})
                    </Text>
                  </View>

                  {/* Bottom Row: Total Item Price & Compact Quantity Selector */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#2E7D32' }}>
                      ₹{itemTotalPrice}
                    </Text>

                    {/* Compact Quantity Selector Row */}
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
                        onPress={() => decreaseQuantity(item.id)}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2E7D32' }}>−</Text>
                      </TouchableOpacity>

                      <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 6, color: '#2E7D32' }}>
                        {qty}
                      </Text>

                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                        onPress={() => increaseQuantity(item.id)}
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
            onPress={placeOrder}
          >
            <Text style={styles.viewCartText}>Place Order →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      
      {/* Categories */}
      <View style={[styles.categorySection, { paddingVertical: 10, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
        <Text style={[styles.sectionTitleHead, { paddingHorizontal: 16, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#1A1A1A' }]}>
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.categoryList, { paddingHorizontal: 16 }]}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: isSelected ? '#2E7D32' : '#F1F3F5',
                  },
                  isSelected && styles.selectedCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { fontSize: 13, fontWeight: '600', color: isSelected ? '#FFFFFF' : '#495057' },
                    isSelected && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products list */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => {
          const quantity = cart[item.id] || 0;

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
              {/* Product image thumbnail */}
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
                  source={{ uri: item.image }}
                  style={{ width: 70, height: 70 }}
                  resizeMode="cover"
                />
              </View>

              {/* Product details wrapper */}
              <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, fontWeight: '600', color: '#868E96', textTransform: 'uppercase', marginBottom: 2 }}>
                  {item.category}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#212529', marginBottom: 2 }} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#868E96', marginBottom: 8 }}>
                  {item.unit}
                </Text>

                {/* Bottom Row inside card: Price & Actions aligned cleanly */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#2E7D32' }}>
                    ₹{item.price}
                  </Text>

                  {/* Inline Action Row: + Add Button OR Compact Quantity Counter */}
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
                      onPress={() => increaseQuantity(item.id)}
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
                        onPress={() => decreaseQuantity(item.id)}
                      >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1C7ED6' }}>−</Text>
                      </TouchableOpacity>

                      <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 6, color: '#1C7ED6' }}>
                        {quantity}
                      </Text>

                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                        onPress={() => increaseQuantity(item.id)}
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={[styles.emptyContainer, { marginTop: 60 }]}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>🔍</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#495057' }}>No products found</Text>
            <Text style={{ fontSize: 13, color: '#868E96', marginTop: 4 }}>
              Try another product name or category.
            </Text>
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
    </SafeAreaView>
  );
}