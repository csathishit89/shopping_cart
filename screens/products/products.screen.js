import React, { useState, useMemo } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import styles from './products.styles';

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
  'Beverages'
];

export default function ProductsScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Quantity selected on each product card
  const [quantities, setQuantities] = useState({});

  // Products actually added to the cart
  const [cart, setCart] = useState({});

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  // Total number of items in the cart
  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  // Total price of cart items
  const cartTotal = PRODUCTS.reduce((total, product) => {
    return total + product.price * (cart[product.id] || 0);
  }, 0);

  const increaseQuantity = (productId) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: (previous[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: Math.max(
        1,
        (previous[productId] || 1) - 1
      ),
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + quantity,
    }));

    Alert.alert(
      'Added to Cart',
      `${quantity} x ${product.name} added successfully.`
    );
  };

  const renderProduct = ({ item }) => {
    const quantity = quantities[item.id] || 1;
    const addedQuantity = cart[item.id] || 0;

    return (
      <View style={styles.productCard}>
        {/* Product image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />

          {addedQuantity > 0 && (
            <View style={styles.addedBadge}>
              <Text style={styles.addedBadgeText}>
                In Cart: {addedQuantity}
              </Text>
            </View>
          )}
        </View>

        {/* Product details */}
        <View style={styles.productDetails}>
          <Text style={styles.productCategory}>
            {item.category}
          </Text>

          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.productUnit}>{item.unit}</Text>

          <Text style={styles.productPrice}>
            ₹{item.price}
          </Text>

          {/* Quantity selector */}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Add to Cart */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.addToCartText}>
              + Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      {/* Categories */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  isSelected && styles.selectedCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
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

      {/* Product list heading */}
      <View style={styles.listHeader}>
        <View>
          <Text style={styles.sectionTitle}>Popular Products</Text>

          <Text style={styles.productCount}>
            {filteredProducts.length} products available
          </Text>
        </View>

        <Text style={styles.deliveryText}>Fresh & Quality</Text>
      </View>

      {/* Products grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>

            <Text style={styles.emptyTitle}>
              No products found
            </Text>

            <Text style={styles.emptySubtitle}>
              Try another product name or category.
            </Text>
          </View>
        }
      />

      {/* Bottom cart summary */}
      {cartCount > 0 && (
        <View style={styles.bottomCart}>
          <View>
            <Text style={styles.bottomCartItems}>
              {cartCount} item{cartCount !== 1 ? 's' : ''} added
            </Text>

            <Text style={styles.bottomCartPrice}>
              ₹{cartTotal.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.viewCartButton}
            activeOpacity={0.8}
            onPress={() => {
              const cartDetails = PRODUCTS.filter(
                (product) => cart[product.id] > 0
              )
                .map(
                  (product) =>
                    `${product.name} x ${cart[product.id]} = ₹${
                      product.price * cart[product.id]
                    }`
                )
                .join('\n');

              Alert.alert(
                'My Cart',
                `${cartDetails}\n\nTotal: ₹${cartTotal.toFixed(2)}`
              );
            }}
          >
            <Text style={styles.viewCartText}>
              View Cart →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}