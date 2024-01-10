import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
