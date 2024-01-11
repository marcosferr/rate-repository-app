import { FlatList, View, Button, StyleSheet, Alert, Text } from "react-native";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { ReviewItem as Review } from "./SingleRepositoryView";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
const ItemSeparator = () => <View style={{ height: 10 }} />;

const ReviewItem = ({ review }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();
  const styles = StyleSheet.create({
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "white",
      padding: 10,
      justifyContent: "space-between",
    },
  });
  const handleDelete = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview({
              variables: {
                id: review.id,
              },
              refetchQueries: [
                {
                  query: ME,
                  variables: { includeReviews: true },
                },
              ],
            });
          },
        },
      ]
    );
  };

  return (
    <View>
      <Review review={review} />
      <View style={styles.flexContainer}>
        <Button
          title="View repository"
          onPress={() => {
            navigate(`/repositories/${review.repositoryId}`);
          }}
        />
        <Button title="Delete repository" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return null;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node);
  if (!reviews) return null;

  if (reviews.length === 0) {
    return (
      <View>
        <Text>You have not reviewed any repositories yet.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
