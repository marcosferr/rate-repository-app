import RepositoryInfo from "./RepositoryInfo";
import { useParams } from "react-router-native";
import { View, FlatList, StyleSheet } from "react-native";
import Text from "./Text";
import { format, parseISO } from "date-fns";
import useRepository from "../hooks/useRepository";
const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "white",
      padding: 10,
    },
    ratingContainer: {
      display: "flex",
      flexGrow: 0,
      marginRight: 10,
      borderWidth: 2,
      borderColor: "#0366d6",
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    rating: {
      color: "#0366d6",
      fontWeight: "bold",
    },
    infoContainer: {
      display: "flex",
      flexGrow: 1,
      flexShrink: 1,
    },
    username: {
      fontWeight: "bold",
    },
    date: {
      color: "#666",
      marginBottom: 5,
    },
    text: {
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>
          {format(parseISO(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={{ height: 10 }} />;

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id);
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;
