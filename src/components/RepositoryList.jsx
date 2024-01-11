import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
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
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <FilterPicker
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </View>
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReach}
    />
  );
};

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const { repositories, fetchMore, refetch } = useRepositories(
    selectedFilter,
    queryValueDebounced
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [queryValueDebounced] = useDebounce(searchQuery, 1000);
  const onEndReach = () => {
    fetchMore();
  };
  useEffect(() => {
    refetch({ searchKeyword: queryValueDebounced });
  }, [queryValueDebounced]);
  return (
    <RepositoryListContainer
      repositories={repositories}
      setSelectedFilter={setSelectedFilter}
      selectedFilter={selectedFilter}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
