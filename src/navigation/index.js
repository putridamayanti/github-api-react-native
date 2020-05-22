import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const routes = [
    {
        name: 'Login', component: LoginScreen, options: {
            headerShown: false
        }
    },
    {
        name: 'Home', component: HomeScreen, options: {
            headerShown: false
        }
    },
    {
        name: 'Detail', component: DetailScreen, options: {
            headerStyle: {
                backgroundColor: '#333333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
];
const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {routes.map((item, i) => {
                    return (
                        <Stack.Screen
                            key={i}
                            name={item.name}
                            component={item.component}
                            options={item.options}
                        />
                    );
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
