import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { db } from "../firebase";

/**
 * @author
 * @function AddChatScreen
 **/
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const { container } = styles;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
    });
  }, [navigation]);

  const createChat = () => {
    db.collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  return (
    <View style={container}>
      <Text style={{ fontSize: 20, paddingBottom: 20 }}>Add Chat Name</Text>
      <Input
        placeholder="Add a Chat Name"
        value={input}
        onChangeText={(input) => setInput(input)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" color="gray" size={20} />
        }
      />
      <Button title="Submit" onPress={createChat} raised />
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
export default AddChatScreen;
