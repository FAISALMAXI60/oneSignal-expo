import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

/**
 * @author
 * @function CustomListItem
 **/
const CustomListItem = ({ item, enterChat }) => {
  const { data } = item;

  return (
    <ListItem key={item.id} onPress={() => enterChat(data.chatName, item.id)}>
      <Avatar
        rounded
        source={{
          uri:
            "https://icons-for-free.com/iconfiles/png/512/boy+man+person+user+woman+icon-1320085967769585303.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{data.chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          By OneSignal Chat App
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({});
export default CustomListItem;
