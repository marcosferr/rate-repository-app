import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
import useUser from "../hooks/useUser";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    display: "flex",

    justifyContent: "center",
    padding: 20,
    // ...
  },
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
  // ...
});

const AppBar = () => {
  const { user } = useUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  console.log(user);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/create-review">
          <Text style={styles.text}>Create review</Text>
        </Link>
        {user ? (
          <Pressable onPress={handleSignOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        ) : (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Link to="/signin">
              <Text style={styles.text}>Sign In</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.text}>Sign Up</Text>
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
