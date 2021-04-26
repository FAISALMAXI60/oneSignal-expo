import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

/**
 * @author
 * @function Login
 **/
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { inputContainer, button, container } = styles;
  const dispatch = useDispatch();

  const LoginFunction = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({
          type: "CURRENT_USER",
          payload: user.user,
        });
      })
      .catch((err) => {
        console.log("error in login", err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
      />
      <View style={inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          title="Login"
          containerStyle={button}
          raised
          onPress={LoginFunction}
        />
        <Button
          title="Register"
          type="outline"
          containerStyle={button}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    textAlign: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
export default Login;
