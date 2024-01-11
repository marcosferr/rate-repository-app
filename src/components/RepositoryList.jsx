import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const FilterPicker = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <Picker
      selectedValue={selectedFilter}
      onValueChange={(itemValue) => setSelectedFilter(itemValue)}
    >
      <Picker.Item label="Select filter" value="" enabled={false} />
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setSelectedFilter,
  selectedFilter,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      ListHeaderComponent={
        <FilterPicker
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const { repositories } = useRepositories(selectedFilter);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSelectedFilter={setSelectedFilter}
      selectedFilter={selectedFilter}
    />
  );
};

export default RepositoryList;
