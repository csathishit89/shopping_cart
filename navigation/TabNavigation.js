import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { getLoginData } from '../redux/login/login.selectors';
import Code from '../constants/ColorCodes';

// Dashboard
import DashboardScreen from '../screens/dashboard/dashboard.screen';

// Operation
// import OperationScreen from '../screens/operation/operations-menu/operations.menu.screen';

// Setting
// import SettingsScreen from '../screens/setttings/settings.screen';

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

// Operation
const OperationStack = createStackNavigator();
function TabOperationNavigator() {
  return (
    <OperationStack.Navigator>
      <OperationStack.Screen
        name="Operation"
        component={OperationScreen}
        options={headBarStyle}
      />
    </OperationStack.Navigator>
  );
}

// Setting
const SettingStack = createStackNavigator();
function TabInventoryNavigator() {
  
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: { backgroundColor: Code.primary },
          headerTitleStyle: { color: Code.white },
          headerTintColor: Code.white,
          headerTitle: 'Setting',
        }}
      />
    </SettingStack.Navigator>
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
        component={TabOperationNavigator}
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
        component={TabOperationNavigator}
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