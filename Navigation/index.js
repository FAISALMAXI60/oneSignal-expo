import React from "react";
import { StyleSheet } from "react-native";
import SplashScreen from "../Screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import HomeScreen from "../Screens/HomeScreen";
import { useSelector } from "react-redux";
import AddChatScreen from "../Screens/AddChat";
import ChatScreen from "../Screens/ChatScreen";

/**
 * @author
 * @function Navigation
 **/
const Navigation = () => {
  const userReducer = useSelector((state) => state.UserReducer);
  const { isAuthenticated, loader } = userReducer;

  const Stack = createStackNavigator();
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  if (loader) {
    return <SplashScreen />;
  } else
    return (
      <NavigationContainer>
        {!isAuthenticated ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={globalScreenOptions}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Register" }}
            ></Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={globalScreenOptions}
          >
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="AddChat" component={AddChatScreen}></Stack.Screen>
            <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({});
export default Navigation;
