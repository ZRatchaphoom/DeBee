/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screen/HomeScreen';
import QuestionScreen from './src/screen/QuestionScreen';
import DashboardScreen from './src/screen/DashboardScreen';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  const backgroundStyle = "bg-black dark:bg-slate-900"

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
        <Stack.Screen name='Question' component={QuestionScreen}/>
        <Stack.Screen name='Dashboard' component={DashboardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
