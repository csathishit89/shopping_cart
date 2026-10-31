import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { getLoginData } from '../redux/login/login.selectors';
import Code from '../constants/ColorCodes';

// Dashboard
import DashboardScreen from '../screens/dashboard/dashboard.screen';

//Products
import ProductsScreen from '../screens/products/products.screen';

// Orders
import OrdersScreen from '../screens/orders/orders.screen';

// Profile
import ProfileScreen from '../screens/profile/profile.screen';

const headBarStyle = {
  headerTitle: '', headerStyle: {  height: 40, backgroundColor: Code.primary }, headerLeft: () => null,
};

const headingStyle = (heading) => ({
  headerStyle: { backgroundColor: Code.primary },
  headerTitleStyle: { color: Code.white },
  headerTintColor: Code.white,
  headerTitle: heading,
});

const BottomTab = createBottomTabNavigator();

// Dashboard
const DashStack = createStackNavigator();
function DashboardTabNavigator() {
  return (
    <DashStack.Navigator
  >
      <DashStack.Screen
        name="DashPage"
        component={DashboardScreen}
        options={headBarStyle}
      />

    </DashStack.Navigator>
  );
}

// Products
const ProductsStack = createStackNavigator();
function TabProductsNavigator() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name="Products"
        component={ProductsScreen}
        options={headBarStyle}
      />
    </ProductsStack.Navigator>
  );
}

// Orders
const OrdersStack = createStackNavigator();
function TabOrdersNavigator() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={headBarStyle}
      />
    </OrdersStack.Navigator>
  );
}

// Profile
const ProfileStack = createStackNavigator();
function TabInventoryNavigator() {
  
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={headBarStyle}
      />
    </ProfileStack.Navigator>
  );
}

function TabNavigation() {
  const loginData = useSelector(getLoginData);

  return (
    <BottomTab.Navigator
      initialRouteName='DashboardPage'
      screenOptions={{
        tabBarActiveTintColor: Code.primary,
        tabBarInactiveTintColor: Code.nonActive,
        tabBarStyle: {
          backgroundColor: Code.primary_light,
        },
        unmountOnBlur: true
      }}
    >
    <BottomTab.Screen
      name="Home"
      component={DashboardTabNavigator}
      options={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="dashboard" color={color} size={26} />
        ),
      }}
    />
    
     
      <BottomTab.Screen
        name="Products"
        component={TabProductsNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="shield" color={color} size={26} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Orders"
        component={TabOrdersNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="shopping-cart" color={color} size={26} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={TabInventoryNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
  
export default TabNavigation;