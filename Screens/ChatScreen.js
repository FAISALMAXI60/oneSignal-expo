import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { db } from "../firebase";
import * as firebase from "firebase";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";

/**
 * @author
 * @function ChatScreen
 **/
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [message, setMessages] = useState([]);

  const {
    container,
    footer,
    inputStyle,
    receiverMessage,
    senderText,
    receiver,
    sender,
    senderName,
  } = styles;
  const userReducer = useSelector((state) => state.UserReducer);
  const { currentUser } = userReducer;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.chatName,
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ marginLeft: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const messages = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return messages;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={0}
        style={container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop:15 }}>
              {message &&
                message.map(({ id, data }) => {
                  return data.email === currentUser.email ? (
                    <View key={id} style={receiver}>
                      <Avatar
                        source={{ uri: data.photoURL }}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        rounded
                        size={30}
                        //WEB
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={senderText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View key={id} style={sender}>
                      <Avatar
                        source={{ uri: data.photoURL }}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        rounded
                        size={30}
                        //WEB
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={receiverMessage}>{data.message}</Text>
                      <Text style={senderName}>{data.displayName}</Text>
                    </View>
                  );
                })}
            </ScrollView>
            <View style={footer}>
              <TextInput
                placeholder="type here..."
                value={input}
                onChangeText={(input) => setInput(input)}
                style={inputStyle}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  inputStyle: {
    bottom: 0,
    flex: 1,
    height: 40,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiverMessage: {
    color:"white",
    fontWeight:"500",
    marginLeft:10
  },
  senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
    // marginBottom: 15,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
});
export default ChatScreen;
