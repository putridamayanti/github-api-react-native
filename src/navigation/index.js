import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from "../screens/LoginScreen";

const routes = [
    {
        name: 'Login', component: LoginScreen, options: {
            title: 'Forgot Password ',
            headerShown: false
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
