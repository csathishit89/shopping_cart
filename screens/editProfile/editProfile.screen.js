import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { loggedInDetails } from '../../redux/login/login.selectors';
import Code from '../../constants/ColorCodes';
import styles from './editProfile.styles';

export default function EditProfileScreen({ navigation }) {
  const loginData = useSelector(loggedInDetails);
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};

  // Helper to convert YYYY-MM-DD or other formats to DD-MM-YYYY for display
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  // Form states initialized with existing user record values
  const [name, setName] = useState(userRecord.UserName || '');
  const [phoneNumber, setPhoneNumber] = useState(userRecord.UserPhoneNumber || '');
  const [emailID, setEmailID] = useState(userRecord.EmailID || userRecord.email || '');
  const [dob, setDob] = useState(formatDateToDDMMYYYY(userRecord.DOB || userRecord.dob));
  const [address, setAddress] = useState(userRecord.Address || userRecord.address || '');
  const [pincode, setPincode] = useState(userRecord.Pincode || userRecord.pincode || '');
  const profileImage = userRecord.ProfileImage || userRecord.image || '';

  // Datepicker visibility state
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Helper to convert DD-MM-YYYY to Date object for the picker
  const getDateObject = (dateStr) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    return new Date();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setDob(`${day}-${month}-${year}`);
    }
  };

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        
        {/* Profile Photo Avatar Container */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: '#E9ECEF',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: 90, height: 90 }}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome name="user" size={45} color="#ADB5BD" />
            )}
          </View>
        </View>

        {/* Input Fields Card Section */}
        <View style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}>
          {/* Name Input */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="user-o" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', width: 90, marginLeft: 8 }}>Name</Text>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#212529', fontWeight: '600', paddingVertical: 4, textAlign: 'right' }}
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              placeholderTextColor="#ADB5BD"
            />
          </View>

          {/* Phone Number Input */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="phone" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', width: 90, marginLeft: 8 }}>Phone</Text>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#212529', fontWeight: '600', paddingVertical: 4, textAlign: 'right' }}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              placeholderTextColor="#ADB5BD"
              keyboardType="phone-pad"
            />
          </View>

          {/* Email ID Input */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="envelope-o" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', width: 90, marginLeft: 8 }}>Email ID</Text>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#212529', fontWeight: '600', paddingVertical: 4, textAlign: 'right' }}
              value={emailID}
              onChangeText={setEmailID}
              placeholder="Enter email address"
              placeholderTextColor="#ADB5BD"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Date Of Birth Picker Row */}
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', width: 90, marginLeft: 8 }}>DOB</Text>
            <Text style={{ flex: 1, fontSize: 14, color: dob ? '#212529' : '#ADB5BD', fontWeight: '600', textAlign: 'right' }}>
              {dob || 'DD-MM-YYYY'}
            </Text>
          </TouchableOpacity>

          {/* DateTimePicker Component */}
          {showDatePicker && (
            <DateTimePicker
              value={getDateObject(dob)}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* Address Input */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="map-marker" size={16} color="#1C7ED6" style={{ width: 24, marginTop: 4 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', width: 90, marginLeft: 8, marginTop: 4 }}>Address</Text>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#212529', fontWeight: '600', paddingVertical: 4, textAlign: 'right', minHeight: 50 }}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              placeholderTextColor="#ADB5BD"
              multiline={true}
            />
          </View>

          {/* Pincode Input */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <FontAwesome name="map-pin" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', width: 90, marginLeft: 8 }}>Pincode</Text>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#212529', fontWeight: '600', paddingVertical: 4, textAlign: 'right' }}
              value={pincode}
              onChangeText={setPincode}
              placeholder="Enter pincode"
              placeholderTextColor="#ADB5BD"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: Code.primary || '#1C7ED6',
            borderRadius: 10,
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
          activeOpacity={0.8}
          onPress={handleSaveProfile}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' }}>Save Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}