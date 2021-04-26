import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

/**
 * @author
 * @function SplashScreen
 **/
const SplashScreen = () => {
  const { container } = styles;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "CURRENT_USER",
          payload: authUser,
        });
      } else {
        dispatch({
          type:"USER_SESSION_ENEDE"
        })
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SplashScreen;
