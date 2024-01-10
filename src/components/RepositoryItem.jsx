import { Text, View, Image, StyleSheet } from "react-native";

const RepositoryItem = ({ item }) => {
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
    statsItem: {
      fontWeight: "bold",
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
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={[styles.flexColumn, styles.details]}>
          <Text style={[styles.statsItem, styles.flexItem]}>
            {item.fullName}
          </Text>
          <Text style={styles.flexItem}>{item.description}</Text>
          <Text style={[styles.language, styles.flexItem]}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text style={styles.statsItem}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text style={styles.statsItemText}>Stars</Text>
        </View>
        <View>
          <Text style={styles.statsItem}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statsItemText}>Forks</Text>
        </View>
        <View>
          <Text style={styles.statsItem}>{item.reviewCount}</Text>
          <Text style={styles.statsItemText}>Reviews</Text>
        </View>
        <View>
          <Text style={styles.statsItem}>{item.ratingAverage}</Text>
          <Text style={styles.statsItemText}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
