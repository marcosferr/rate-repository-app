import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes =
    repositories !== undefined
      ? repositories.edges.map((edge) => edge.node)
      : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
