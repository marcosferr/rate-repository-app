import { View, Image, StyleSheet, Button } from "react-native";
import { openURL } from "expo-linking";
import { Link } from "react-router-native";
import Text from "./Text";
const RepositoryItem = ({ item, showButton }) => {
  const formatCount = (count) => {
    if (count >= 1000) {
      const formattedCount = (count / 1000).toFixed(1);
      return `${formattedCount}k`;
    }
    return count.toString();
  };

  const styles = StyleSheet.create({
    flexContainer: {
      display: "flex",
      flexDirection: "row",
    },
    flexItem: {
      flexGrow: 1,
      margin: 3,
    },
    image: {
      width: 50,
      height: 50,
    },
    details: {
      marginLeft: 10,
    },
    language: {
      backgroundColor: "#0366d6",
      color: "white",
      padding: 5,
      borderRadius: 5,
      alignSelf: "flex-start",
    },
    stats: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
    },
    statsItemText: {
      color: "grey",
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
    },
  });

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.flexContainer}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={[styles.flexColumn, styles.details]}>
          {!showButton && (
            <Link to={`/repositories/${item.id}`}>
              <Text style={styles.flexItem} fontWeight="bold">
                {item.fullName}
              </Text>
            </Link>
          )}
          {showButton && (
            <Text style={styles.flexItem} fontWeight="bold">
              {item.fullName}
            </Text>
          )}
          <Text style={styles.flexItem}>{item.description}</Text>
          <Text style={[styles.language, styles.flexItem]}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text style={styles.statsItemText}>Stars</Text>
        </View>
        <View>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
          <Text style={styles.statsItemText}>Forks</Text>
        </View>
        <View>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text style={styles.statsItemText}>Reviews</Text>
        </View>
        <View>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text fontSize="subheading">Rating</Text>
        </View>
      </View>
      {showButton && (
        <Button title="Open in GitHub" onPress={() => openURL(item.url)} />
      )}
    </View>
  );
};

export default RepositoryItem;
