import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutResponseChanged } from '../../redux/login/login.action';
import { loggedInDetails } from '../../redux/login/login.selectors';
import styles from './profile.styles';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};

  const userProfile = {
    name: userRecord.UserName || 'User',
    phoneNumber: userRecord.UserPhoneNumber ? '+91 ' + userRecord.UserPhoneNumber : '-',
    emailID: userRecord.EmailID || userRecord.email || '-',
    address: userRecord.Address || userRecord.address || '-',
    dob: userRecord.DOB || userRecord.dob || '-',
    profileImage: userRecord.ProfileImage || userRecord.image || '',
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@selected_category_id');
              await AsyncStorage.removeItem('@cart_storage_key');
              dispatch(logoutResponseChanged())
              if (navigation && navigation.replace) {
                navigation.replace('Login');
              }
            } catch (error) {
              console.error('Failed to logout', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Profile Header Title */}
      <View style={{ paddingVertical: 14, alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#212529' }}>My Profile</Text>
      </View>

      {/* Profile Content Container */}
      <View style={{ alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16 }}>
        
        {/* Profile Photo Avatar Container with Spacing for Edit Badge */}
        <View style={{ position: 'relative', marginTop: 8, marginRight: 8, marginBottom: 16 }}>
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
            {userProfile.profileImage ? (
              <Image
                source={{ uri: userProfile.profileImage }}
                style={{ width: 90, height: 90 }}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome name="user" size={45} color="#ADB5BD" />
            )}
          </View>

          {/* Top-Right Edit Icon Badge */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: '#1C7ED6',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 3,
            }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <FontAwesome name="pencil" size={12} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* User Name */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#212529', marginBottom: 20 }}>
          {userProfile.name}
        </Text>

        {/* Details Card Section */}
        <View style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 4,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}>
          {/* Full Name Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="user-o" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', marginLeft: 8 }}>Name</Text>
            <Text style={{ fontSize: 14, color: '#212529', marginLeft: 'auto', fontWeight: '600' }} numberOfLines={1}>{userProfile.name}</Text>
          </View>

          {/* Phone Number Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="phone" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', marginLeft: 8 }}>Phone</Text>
            <Text style={{ fontSize: 14, color: '#212529', marginLeft: 'auto', fontWeight: '600' }}>{userProfile.phoneNumber}</Text>
          </View>

          {/* Email ID Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="envelope-o" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', marginLeft: 8 }}>Email ID</Text>
            <Text style={{ fontSize: 14, color: '#212529', marginLeft: 'auto', fontWeight: '600' }} numberOfLines={1}>{userProfile.emailID}</Text>
          </View>

          {/* Date Of Birth Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
            <FontAwesome name="calendar" size={16} color="#1C7ED6" style={{ width: 24 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', marginLeft: 8 }}>Date of Birth</Text>
            <Text style={{ fontSize: 14, color: '#212529', marginLeft: 'auto', fontWeight: '600' }} numberOfLines={1}>{userProfile.dob}</Text>
          </View>

          {/* Address Row */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12 }}>
            <FontAwesome name="map-marker" size={16} color="#1C7ED6" style={{ width: 24, marginTop: 2 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#495057', marginLeft: 8 }}>Address</Text>
            <Text style={{ fontSize: 14, color: '#212529', marginLeft: '16', fontWeight: '600', flex: 1, textAlign: 'right' }} numberOfLines={2}>
              {userProfile.address}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#FFF5F5',
            borderWidth: 1,
            borderColor: '#FFE3E3',
            borderRadius: 10,
            paddingVertical: 14,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={16} color="#FA5252" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#FA5252' }}>Logout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}