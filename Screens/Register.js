import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

/**
 * @author
 * @function Register
 **/
const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  
  const { container, inputContainer, button } = styles;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "ABC",
    });
  }, [navigation]);

  const registerFunction = () => {
    setIsRegistering(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user
          .updateProfile({
            displayName: fullName,
            photoURL:
              imageUrl ||
              "https://icons-for-free.com/iconfiles/png/512/boy+man+person+user+woman+icon-1320085967769585303.png",
          })
          .then((user) => {
            dispatch({
              type: "CURRENT_USER",
              payload: authUser.user,
            });
            setIsRegistering(false);
          })
          .catch((err) => {
            console.log("profile creating error", err);
          });
      })
      .catch((err) => {
        setIsRegistering(false);
        console.log("here is the error===>", err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={container}>
      <Text h3 style={{ marginBottom: 50, fontSize: 20 }}>
        Create a Signal account
      </Text>
      <View style={inputContainer}>
        <Input
          autoFocus
          placeholder="Full Name"
          value={fullName}
          onChangeText={(fullName) => setFullName(fullName)}
        />
        <Input
          placeholder="Email"
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
        <Input
          placeholder="Profile Picture URL (optional)"
          value={imageUrl}
          onChangeText={(imageUrl) => setImageUrl(imageUrl)}
          onSubmitEditing={registerFunction}
        />
        <Button
          raised
          title={isRegistering ? "Loading..." : "Register"}
          containerStyle={button}
          onPress={registerFunction}
          disabled={isRegistering}
        />
        <Button
          title="Login"
          containerStyle={button}
          onPress={() => navigation.navigate("Login")}
          type="outline"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
export default Register;
