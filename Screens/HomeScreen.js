import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import CustomListItem from "../Components/Custom_ListItems";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

/**
 * @author
 * @function HomeScreen
 **/
const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const userReducer = useSelector((state) => state.UserReducer);
  const { currentUser } = userReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("chats").onSnapshot((snapShot) => {
      setChats(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              auth.signOut().then(() =>
                dispatch({
                  type: "LOGOUT",
                })
              );
            }}
          >
            <Avatar
              rounded
              source={{
                uri: currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
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
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (chatName, id) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {chats &&
          chats.map((item) => {
            return (
              <CustomListItem key={item.id} item={item} enterChat={enterChat} />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
export default HomeScreen;
