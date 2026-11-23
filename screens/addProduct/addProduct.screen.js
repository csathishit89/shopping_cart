
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';

import Code from '../../constants/ColorCodes';
import styles from './addProduct.styles';
import { 
  getCategoryDataRespReset, 
  getCategoryDataStart
} from '../../redux/category/category.action';

import { 
  selectCategoryResponse, 
  selectCategoryResponseData, 
} from '../../redux/category/category.selectors';

import { 
  addProductRespReset,
  addProductStart,
} from '../../redux/product/product.action';

import { 
  selectAddProductResponse,
  selectAddProductData,
} from '../../redux/product/product.selectors';

import { loggedInDetails } from '../../redux/login/login.selectors';

const BORDER_COLOR = '#DEE2E6';
const LABEL_COLOR = '#495057';
const MUTED_COLOR = '#ADB5BD';

export default function AddProductScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};
  const categoryResp = useSelector(selectCategoryResponse);
  const categoryResponseData = useSelector(selectCategoryResponseData);
  const addProductResponse = useSelector(selectAddProductResponse);
  const addProductData = useSelector(selectAddProductData);
  const getShopID = userRecord.ShopID;

  // Product fields
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [productImage, setProductImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Price and quantity fields
  const [quantity, setQuantity] = useState('1');
  const [quantityType, setQuantityType] = useState('');
  const [mrpPrice, setMrpPrice] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [profitPrice, setProfitPrice] = useState('');
  const [isLoading, setLoginSpinner] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Select product image
  const handleImagePicker = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow gallery access to select a product image.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setProductImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to select image.');
    }
  };

  useEffect(() => {
    const getDashData = {
      shopID:getShopID,
      databaseName: 'General'
    };
    dispatch(getCategoryDataStart(getDashData));
  }, []);

  useEffect(() => {
  if (categoryResponseData) {

    // Check whether API response is an array
    let categoryList = [];

    if (Array.isArray(categoryResponseData)) {
      categoryList = categoryResponseData;
    } else if (Array.isArray(categoryResponseData.data)) {
      categoryList = categoryResponseData.data;
    }

    setCategories(categoryList);
    setLoadingCategories(false);
  }

}, [categoryResponseData]);

  useEffect(() => {
    if (categoryResp !== null) {
        dispatch(getCategoryDataRespReset())
    }
  }, [categoryResp]);

  useEffect(() => {
      if (addProductResponse !== null) {
        setLoginSpinner(false);
        if(addProductResponse.statusCode=='01'){
            dispatch(addProductRespReset());
            navigation.navigate('ProfileMain');
            Alert.alert('Success', 'Product added successfully!');
        } else {
            Alert.alert('Success', 'Failed to add product!');
        }
      }
    }, [addProductResponse]);

  const updatePrice = (value, setter) => {
    setter(value.replace(/[^0-9.]/g, ''));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEffectiveDate(selectedDate);
    }
  };

    const calculateProfitPrice = (nextMrp, nextPurchase) => {
        if (nextMrp === '' || nextPurchase === '') {
            setProfitPrice('');
            return;
        }

        const mrpNum = parseFloat(nextMrp);
        const purchaseNum = parseFloat(nextPurchase);

        if (!Number.isNaN(mrpNum) && !Number.isNaN(purchaseNum)) {
            const profit = Math.round((mrpNum - purchaseNum) * 100) / 100;
            setProfitPrice(String(profit));
        }
    };

    const handleMrpPriceChange = (value) => {
        const sanitizedMrp = value.replace(/[^0-9.]/g, '');
        setMrpPrice(sanitizedMrp);
        calculateProfitPrice(sanitizedMrp, purchasePrice);
    };

    const handlePurchasePriceChange = (value) => {
        const sanitizedPurchase = value.replace(/[^0-9.]/g, '');
        setPurchasePrice(sanitizedPurchase);
        calculateProfitPrice(mrpPrice, sanitizedPurchase);
    };

  // Reusable input field
  const renderInput = (
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    editable = true
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={MUTED_COLOR}
        keyboardType={keyboardType}
        editable={editable}
      />
    </View>
  );

  // Save product
  const handleSaveProduct = () => {
    if (!categoryID) {
      Alert.alert('Required', 'Please enter category ID.');
      return;
    }

    if (!productName.trim()) {
      Alert.alert('Required', 'Please enter product name.');
      return;
    }

    if (!quantity.trim() || Number(quantity) <= 0) {
      Alert.alert('Invalid Quantity', 'Enter a valid quantity.');
      return;
    }

    if (!quantityType.trim()) {
      Alert.alert('Required', 'Please enter quantity type.');
      return;
    }

    if (
      !mrpPrice.trim() ||
      !purchasePrice.trim() ||
      !profitPrice.trim()
    ) {
      Alert.alert('Required', 'Please enter all price details.');
      return;
    }

    const productPayload = {
        productName: productName.trim(),
        productCode: productCode.trim(),
        categoryID: categoryID,
        productImage: productImage?.uri || '',
        shopID: Number(getShopID),
        quantity: Number(quantity),
        quantityType: quantityType.trim(),
        mrpPrice: Number(mrpPrice),
        purchasePrice: Number(purchasePrice),
        profitPrice: Number(profitPrice),
        effectiveDateTime: effectiveDate.toISOString().split('T')[0],
        isActive: 1,
        databaseName: userRecord.DatabaseName
    };

    setLoginSpinner(true);
    dispatch(addProductStart(productPayload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Product Image Upload - Top Centre */}
        <View style={imageStyles.container}>
          <TouchableOpacity
            style={imageStyles.imageBox}
            activeOpacity={0.8}
            onPress={handleImagePicker}
          >
            {productImage?.uri ? (
              <Image
                source={{ uri: productImage.uri }}
                style={imageStyles.preview}
                resizeMode="cover"
              />
            ) : (
              <View style={imageStyles.placeholder}>
                <FontAwesome
                  name="camera"
                  size={32}
                  color="#ADB5BD"
                />
                <Text style={imageStyles.placeholderText}>
                  Add Product Image
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={imageStyles.uploadButton}
            onPress={handleImagePicker}
            activeOpacity={0.8}
          >
            <FontAwesome name="upload" size={14} color="#FFFFFF" />
            <Text style={imageStyles.uploadText}>
              Upload Image
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* Product Information */}
        <Text style={styles.sectionTitle}>
          Product Information
        </Text>
        
        

        <View style={styles.card}>
            <View style={styles.fieldContainer}>
                <Text style={styles.inputLabel}>Category</Text>

                <View style={styles.dropdownContainer}>
                    <Picker
                    selectedValue={categoryID}
                    onValueChange={(value) => setCategoryID(value)}
                    enabled={!loadingCategories}
                    style={styles.dropdown}
                    mode="dropdown"
                    >
                    <Picker.Item
                        label={
                        loadingCategories
                            ? 'Loading categories...'
                            : categories.length === 0
                            ? 'No categories available'
                            : 'Select Category'
                        }
                        value=""
                    />

                    {categories.map((item) => (
                        <Picker.Item
                        key={item.CategoryID}
                        label={item.CategoryName}
                        value={item.CategoryID}
                        />
                    ))}
                    </Picker>
                </View>
            </View>
            
          {renderInput(
            'Product Name',
            productName,
            setProductName,
            'Enter product name'
          )}

          {/* {renderInput(
            'Product Code',
            productCode,
            setProductCode,
            'Enter product code'
          )} */}

          {renderInput(
            'Quantity',
            quantity,
            (value) => updatePrice(value, setQuantity),
            'Enter quantity',
            'decimal-pad'
          )}

          {renderInput(
            'Quantity Type',
            quantityType,
            setQuantityType,
            'e.g. pcs, kg, litre'
          )}

          {renderInput(
            'MRP Price',
            mrpPrice,
            handleMrpPriceChange,
            'Enter MRP price',
            'decimal-pad'
          )}

          {renderInput(
            'Purchase Price',
            purchasePrice,
            handlePurchasePriceChange,
            'Enter purchase price',
            'decimal-pad'
          )}

          {renderInput(
            'Profit Price',
            profitPrice,
            (value) => updatePrice(value, setProfitPrice),
            'Enter profit price',
            'decimal-pad',
            false
          )}
        
          <View style={styles.fieldContainer}>
            <Text style={styles.inputLabel}>
              Effective Date
            </Text>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {effectiveDate.toLocaleDateString('en-GB')}
              </Text>

              <FontAwesome
                name="calendar"
                size={18}
                color={Code.primary || '#1C7ED6'}
              />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={effectiveDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </ScrollView>

      {/* Floating Add Product Button */}
        <TouchableOpacity
        style={styles.floatingSaveButton}
        activeOpacity={0.85}
        onPress={handleSaveProduct}
        >
            <FontAwesome name="save" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        
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

const imageStyles = {
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageBox: {
    width: 130,
    height: 130,
    borderRadius: 12,
    backgroundColor: '#F1F3F5',
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderStyle: 'dashed',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#6C757D',
    fontSize: 12,
    marginTop: 8,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C7ED6',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
};
