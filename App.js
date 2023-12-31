import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserMainScreen from './src/Main/User_Main';
import ManagerMainScreen from './src/Main/Manager_Main';
import LoginScreen from './src/Login/Login';
import InfoUserScreen from './src/Header/Info/Info_User';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="User" component={UserMainScreen} />
        <Stack.Screen name="Manager" component={ManagerMainScreen} />
        <Stack.Screen name="Info_User" component={InfoUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
