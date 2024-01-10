import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
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
  },
  // ...
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <Text style={styles.text}>Repositories</Text>
      </View>
    </Pressable>
  );
};

export default AppBar;
